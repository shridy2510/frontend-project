const keycloakConfig = {
    realm:  process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT

}
export default keycloakConfig