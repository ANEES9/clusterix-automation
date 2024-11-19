import axios from 'axios';
import FormData from 'form-data';
import { applicationConfig } from './application-config';
import * as dotenv from 'dotenv';
dotenv.config();

export async function reportBug(
    description: string,
    applicationSlug: keyof typeof applicationConfig,
    reportType: string,
    screenshotBuffer?: Buffer
) {
    const config = applicationConfig[applicationSlug];
    if (!config) {
        throw new Error(`Invalid application slug: ${applicationSlug}`);
    }
    const formData = new FormData();
    formData.append('description', description);
    formData.append('application_id', config.application_id.toString());
    formData.append('user_id', config.user_id.toString());
    formData.append('report_type', reportType);

    if (screenshotBuffer) {
        formData.append('screenshot', screenshotBuffer, 'screenshot.png');
    }
    try {
        const response = await axios.post(
            process.env.BUG_REPORT_API!,
            formData,
            {
                headers: {
                    'authorization': `Bearer ${process.env.BUG_REPORT_TOKEN}`,
                    ...formData.getHeaders(),
                },
            }
        );
        console.log(`Bug report created successfully for ${applicationSlug}:`, response.data);
        await formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error occurred:');
            console.error('Status Code:', error.response?.status);
            console.error('Response Data:', error.response?.data);
        } else {
            console.error('General error:', error);
        }
    }
}

