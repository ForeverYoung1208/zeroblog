// any name
export const projectName = 'zeroblog';

// define your registered domain
export const domainName = 'for-test.click';

// these resources will be created automatically
export const subDomainNameFrontend = 'blog.for-test.click';
export const subDomainNameApi = 'api.blog.for-test.click';
export const userDeploerName = `${projectName}-deployer`;
export const websiteIndexDocument = 'index.html';
export const allowOrigins = [
  'http://blog.for-test.click',
  'https://blog.for-test.click',
  'http://localhost:3000',
];

// you can leave this unchanged
export const LAMBDAS: Record<
  'api' | 'layerNodeModules',
  { path: string; handler: string }
> = {
  api: {
    path: '../../api/lambdas/build/lambda-api',
    handler: 'api-main.mainHandler',
  },
  layerNodeModules: {
    path: '../../api/lambdas/build_lambda_layer/layer.zip',
    handler: '',
  },
};
