declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"post": {
"Academic-Exchange-Between-Acoustics-UACh-and-ENTPE--Universit-de-Lyon-for-Research-on-Active-Porous-Materials.md": {
	id: "Academic-Exchange-Between-Acoustics-UACh-and-ENTPE--Universit-de-Lyon-for-Research-on-Active-Porous-Materials.md";
  slug: "academic-exchange-between-acoustics-uach-and-entpe--universit-de-lyon-for-research-on-active-porous-materials";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"Claudio-C-Parra-Awarded-CIRE-Scholarship-by-the-Acoustical-Society-of-America.md": {
	id: "Claudio-C-Parra-Awarded-CIRE-Scholarship-by-the-Acoustical-Society-of-America.md";
  slug: "claudio-c-parra-awarded-cire-scholarship-by-the-acoustical-society-of-america";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"Dr-Rodolfo-Venegas-Completes-Research-Tour-in-Poland-and-France.md": {
	id: "Dr-Rodolfo-Venegas-Completes-Research-Tour-in-Poland-and-France.md";
  slug: "dr-rodolfo-venegas-completes-research-tour-in-poland-and-france";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"Dr-Rodolfo-Venegas-Delivers-Invited-Lecture-at-Cambridges-Isaac-Newton-Institute.md": {
	id: "Dr-Rodolfo-Venegas-Delivers-Invited-Lecture-at-Cambridges-Isaac-Newton-Institute.md";
  slug: "dr-rodolfo-venegas-delivers-invited-lecture-at-cambridges-isaac-newton-institute";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"Dr-Rodolfo-Venegas-Presents-Research-at-Forum-Acusticum-2023-in-Italy.md": {
	id: "Dr-Rodolfo-Venegas-Presents-Research-at-Forum-Acusticum-2023-in-Italy.md";
  slug: "dr-rodolfo-venegas-presents-research-at-forum-acusticum-2023-in-italy";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"Dr-Venegas-Engages-in-Exchange-with-Universit-de-Lyon.md": {
	id: "Dr-Venegas-Engages-in-Exchange-with-Universit-de-Lyon.md";
  slug: "dr-venegas-engages-in-exchange-with-universit-de-lyon";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"Dr-Venegas-Shares-Fondecyt-1211310-Project-Results-in-the-UK.md": {
	id: "Dr-Venegas-Shares-Fondecyt-1211310-Project-Results-in-the-UK.md";
  slug: "dr-venegas-shares-fondecyt-1211310-project-results-in-the-uk";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"FIA-2024-conference-proceedings.md": {
	id: "FIA-2024-conference-proceedings.md";
  slug: "fia-2024-conference-proceedings";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"International-Researchers-Join-ACOUSPHEM.md": {
	id: "International-Researchers-Join-ACOUSPHEM.md";
  slug: "international-researchers-join-acousphem";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"Online-Guest-Lecture-by-Dr-Rodolfo-Venegas-at-Tianjin-University-China.md": {
	id: "Online-Guest-Lecture-by-Dr-Rodolfo-Venegas-at-Tianjin-University-China.md";
  slug: "online-guest-lecture-by-dr-rodolfo-venegas-at-tianjin-university-china";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"Polish-Researcher-Dr-Tomasz-G-Zieliski-Completes-Research-Stay-at-UACh-Institute-of-Acoustics.md": {
	id: "Polish-Researcher-Dr-Tomasz-G-Zieliski-Completes-Research-Stay-at-UACh-Institute-of-Acoustics.md";
  slug: "polish-researcher-dr-tomasz-g-zieliski-completes-research-stay-at-uach-institute-of-acoustics";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"acousphem-at-fia-2024.md": {
	id: "acousphem-at-fia-2024.md";
  slug: "acousphem-at-fia-2024";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"anillo-project-visit_to_uach.md": {
	id: "anillo-project-visit_to_uach.md";
  slug: "anillo-project-visit_to_uach";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"anillo-proyect-start.md": {
	id: "anillo-proyect-start.md";
  slug: "anillo-proyect-start";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"ccparra-graduated.md": {
	id: "ccparra-graduated.md";
  slug: "ccparra-graduated";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"forellana-graduated.md": {
	id: "forellana-graduated.md";
  slug: "forellana-graduated";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
