declare module 'astro:env/client' {
	export const PUBLIC_DECAP_CMS_SRC_URL: string;	
export const PUBLIC_DECAP_CMS_VERSION: string;	

}

declare module 'astro:env/server' {
	export const OAUTH_GITHUB_CLIENT_ID: string;	
export const OAUTH_GITHUB_CLIENT_SECRET: string;	
export const OAUTH_GITHUB_REPO_ID: string;	


	export const getSecret: (key: string) => string | undefined;
}
