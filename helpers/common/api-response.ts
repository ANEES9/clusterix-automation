import { Page } from '@playwright/test';
import { getEnvBasedUrl } from './get-api-url';


export async function ApiResponse(page:Page, apiProdUrl: string, apiTestUrl?: string) {

    let status:number|null = null, data:any = null;

     // Intercept the API request
     await page.route(getEnvBasedUrl(apiProdUrl, apiTestUrl), async (route) => {
        route.continue(); 

        const response = await route.request().response();
        if (response) {
            // Capture the status
            status = response.status();
            console.log('API Response Status:', status);

            try {
                // Extract the JSON response body (if applicable)
                data = await response.json().then((data) => (data?.data || null));
                console.log('API Response Body:', data);
                
            } catch (error) {
                console.error('Error parsing response body:', error);
            }
        } else {
            console.log('No response received for the API call.');
        }
    });

    return () => ({
status, data
    })
}
