import { services, ServicesType } from 'config/api-config'

/**
 * Generates the full endpoint URL for a given service and endpoint name.
 * Supports dynamic parameter substitution.
 *
 * @param serviceName - The name of the service (e.g., 'authService', 'emailService').
 * @param endpoint - The endpoint name (e.g., 'login', 'sendDraft').
 * @param params - An optional object with key-value pairs to replace placeholders in the endpoint path.
 * @returns The full URL for the endpoint.
 */
export function getEndpoint<
  ServiceName extends keyof ServicesType,
  EndpointName extends keyof ServicesType[ServiceName]['endpoints'],
>(
  serviceName: ServiceName,
  endpoint: EndpointName,
  params?: Record<string, string | number>
): string {
  const serviceConfig = services[serviceName]
  if (!serviceConfig) {
    throw new Error(`Service "${serviceName}" not found in configuration`)
  }

  const endpointPath = serviceConfig.endpoints[endpoint]
  if (!endpointPath) {
    throw new Error(
      `Endpoint "${String(endpoint)}" not found for service "${serviceName}"`
    )
  }

  // Replace placeholders (e.g., ":id") with actual values from params
  let resolvedEndpoint = endpointPath
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      resolvedEndpoint = resolvedEndpoint.replace(`:${key}`, value.toString())
    })
  }

  return `${serviceConfig.apiUrl}${resolvedEndpoint}`
}
