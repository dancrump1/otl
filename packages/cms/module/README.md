## Revalidate module: Technical documentation

- **File**: `packages/cms/module/revalidate.php`
- **Namespace**: `modules\revalidate`
- **Purpose**: Automatically trigger frontend page revalidation (Next.js on-demand revalidation) when Craft CMS content changes, via a queued background job with batched async HTTP requests.

### Responsibilities

- **Listen** to Craft CMS element lifecycle events.
- **Determine** which URIs to revalidate (single page vs all pages).
- **Enqueue** a `RevalidateJob` into Craft’s queue.
- **Batch and execute** async HTTP POST requests to the frontend revalidation API.
- **Track progress** and log outcomes per URI.

### Dependencies

- Craft CMS services: `Elements`, `Structures`, queue.
- Verbb Navigation plugin: `verbb\navigation\elements\Node` (navigation nodes).
- Guzzle HTTP client: async requests.
- Environment variables: `UI_BASE_URL`, `NEXTJS_SECRET`.
- Frontend route (e.g., Next.js) at `/api/revalidate` that accepts `secret` and `uri`.

### Configuration

Set these environment variables:

- **`UI_BASE_URL`**: Base URL of the frontend (e.g., `https://www.example.com`).
- **`NEXTJS_SECRET`**: Shared secret for the revalidation endpoint.

Operational requirements:

- Ensure a Craft queue worker is running to process `RevalidateJob`.
- Ensure the frontend implements an API route to accept revalidation requests:

```text
POST {UI_BASE_URL}/api/revalidate?secret={NEXTJS_SECRET}&uri={encoded-uri}
```

The module constructs requests like:

```text
{UI_BASE_URL}/api/revalidate?secret={NEXTJS_SECRET}&uri={uri}
```

### Event triggers

The module binds to these Craft/Navigation events during initialization:

- **Elements after save**: `Elements::EVENT_AFTER_SAVE_ELEMENT`
- **Navigation node after save**: `Node::EVENT_AFTER_SAVE`
- **Elements after delete**: `Elements::EVENT_AFTER_DELETE_ELEMENT`
- **Elements after resave**: `Elements::EVENT_AFTER_RESAVE_ELEMENT`
- **Elements after restore**: `Elements::EVENT_AFTER_RESTORE_ELEMENT`
- **Structures after move element**: `Structures::EVENT_AFTER_MOVE_ELEMENT`

Behavior per trigger:

- If the element is a Navigation `Node` or a structure move occurs → revalidate all pages.
- Otherwise → revalidate only the affected entry page plus home and sitemap.

### Revalidation strategies

#### Single-page revalidation

Triggered by entry save/update/delete/restore for concrete, live entries (not drafts/revisions) with a non-null `uri`:

- Revalidate the entry’s `uri`.
- Always include `__home__`.
- Always include `sitemap.xml`.

If the element is a `Category` or `GlobalSet`, perform an all-pages revalidation instead.

You may add related URIs for circular dependencies (pages that consume data from each other) in `handleAfterSave()`.

#### Global (all-pages) revalidation

Triggered by navigation changes, structure moves, or when saving categories/global sets.

Pages included:

- All entries from sections: `contentPages`, `articles`, `events` (Event Calendar plugin).
- Plus special URIs: `__home__`, `search`, `sitemap.xml`.

To include additional sections, extend `revalidateAllPages()` accordingly.

### Queue job details (`RevalidateJob`)

- **Inputs**:
  - `uri_strings: string[]` (required): URIs to revalidate.
  - `batchSize: int` (optional, default 10): Number of URIs per async batch.
- **Execution**:
  - Splits `uri_strings` into `batchSize` chunks.
  - Sends async `POST` requests to the frontend revalidation endpoint for each `uri`.
  - Updates queue progress as URIs resolve.
  - Logs per-URI success/failure and per-batch completion.
- **Job description**: Displays “Refreshing N pages. Please wait to view changes.” in the queue UI.

### External API contract (frontend)

- **Endpoint**: `POST {UI_BASE_URL}/api/revalidate?secret={NEXTJS_SECRET}&uri={encoded-uri}`
- **Expected result**: HTTP 200 on successful revalidation; non-200 is treated as failure.
- **`uri` values** may be:
  - A Craft entry URI (e.g., `about-us/team`).
  - Special tokens:
    - `__home__`: signals the frontend to revalidate the home route.
    - `sitemap.xml`: revalidate the generated sitemap.
    - `search`: revalidate the search page (when running all-pages revalidation).

Frontend expectations:

- Validate the `secret`.
- Perform route-specific revalidation based on `uri`.
- Return HTTP 200 on success.

### Extending the module

- **Add custom sections to all-pages**: Modify `revalidateAllPages()` to include additional Craft sections and merge their URIs.
- **Handle circular dependencies**: In `handleAfterSave()`, append related URIs that should be revalidated when a specific entry type changes.
- **Adjust batch size**: Push jobs with a custom `batchSize`, e.g. `new RevalidateJob(['uri_strings' => $uris, 'batchSize' => 20])`.

### Logging and observability

- Per-URI logs on success/failure with HTTP status or error details.
- Batch completion logs indicating current batch and total batches.
- Queue progress updates: fraction and message “X of Y revalidated”.

### Security considerations

- Uses a shared secret via query string. Ensure:
  - `UI_BASE_URL` uses HTTPS.
  - `NEXTJS_SECRET` is strong and rotated periodically.
  - Frontend endpoint verifies the secret and may apply rate limiting.

### Operational notes

- A running Craft queue worker is required; otherwise jobs will queue until the worker resumes.
- If `UI_BASE_URL` or `NEXTJS_SECRET` are missing/invalid, requests will fail; verify env configuration.

### Troubleshooting

- **No pages revalidate**:
  - Check Craft logs for “No URIs to revalidate.” and confirm event triggers fired.
  - Validate `UI_BASE_URL` and `NEXTJS_SECRET` env vars.
  - Confirm the queue worker is active and processing jobs.
- **Some pages remain stale**:
  - Add circular dependencies for related pages in `handleAfterSave()`.
  - Ensure the section is included in `revalidateAllPages()`.
- **Frontend returns non-200**:
  - Inspect frontend API logs; verify `uri` handling and secret validation.

### Examples

- **Add a new section to all-pages revalidation**:
  - In `revalidateAllPages()`, include `Entry::find()->section('mySection')->all()` and merge their URIs into the job payload.
- **Add a circular dependency**:
  - In `handleAfterSave()`, after adding the main entry `uri`, append related page URIs that consume the saved entry’s data.
