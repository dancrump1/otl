export const gtmPageView = (rest: any) => {
    window.dataLayer?.push({
        event: "page_view",
        url: window.location.href,
        ...rest,
    });
};