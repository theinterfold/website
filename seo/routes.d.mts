// routes.mjs is plain ESM so a Node build script can import it without a
// compile step. This is the shape it hands to the app.
export declare const SITE: {
  origin: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  twitter: string;
};

export declare const ROUTES: {
  path: string;
  title: string;
  description: string;
}[];
