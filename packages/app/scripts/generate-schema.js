import * as fs from "fs";

import cmsClient from "../src/pages-utils/cmsClient.js";

const query = `
query {
  __schema {
    types {
      name
      kind
      fields {
        name
        type {
          name
        }
      }
    }
  }
}
`;

async function getObjectTypes() {
	let data;
	try {
		const client = cmsClient();

		data = await client.request(query);

		const objectTypes = data.__schema.types.filter(
			(type) => type.kind === "OBJECT"
		);

		fs.writeFileSync(
			"object-types.json",
			JSON.stringify(objectTypes, null, 2)
		);
	} catch (error) {
		console.error("Error fetching schema:", error);
	}
}

getObjectTypes();
