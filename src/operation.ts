import type { Endpoint, EndpointTree } from './endpoint';
import type { CallOptions, SeparatedParams } from './execute';
import type { Dict, OperationContext } from './types';

import { isEndpoint } from './endpoint';
import { execute, rethrowOrWrap } from './execute';

type UntypedOperation = ((
  params?: Dict,
  options?: CallOptions,
) => Promise<unknown>) & {
  raw: (params?: SeparatedParams, options?: CallOptions) => Promise<unknown>;
};

/** @internal */
export function buildOperationTree(
  tree: EndpointTree,
  context: OperationContext,
): Dict {
  return Object.entries(tree).reduce<Dict>((result, [key, value]) => {
    if (isEndpoint(value)) {
      result[key] = createOperation(value, context);
    } else {
      result[key] = buildOperationTree(value, context);
    }
    return result;
  }, {});
}

/** @internal */
export function createOperation(
  endpoint: Endpoint,
  context: OperationContext,
): UntypedOperation {
  async function flat(
    params: Dict = {},
    callOptions?: CallOptions,
  ): Promise<unknown> {
    try {
      return await execute(
        endpoint,
        context,
        {
          body: endpoint.request?.body?.parse(params) as Dict | undefined,
          pathParams: endpoint.pathParams?.parse(params) as Dict | undefined,
          query: endpoint.request?.query?.parse(params) as Dict | undefined,
        },
        callOptions,
      );
    } catch (error) {
      rethrowOrWrap(error);
    }
  }

  async function raw(
    params: SeparatedParams = {},
    callOptions?: CallOptions,
  ): Promise<unknown> {
    try {
      return await execute(
        endpoint,
        context,
        {
          body: endpoint.request?.body?.parse(params.body) as Dict | undefined,
          pathParams: endpoint.pathParams?.parse(params.pathParams) as
            | Dict
            | undefined,
          query: endpoint.request?.query?.parse(params.query) as
            | Dict
            | undefined,
        },
        callOptions,
      );
    } catch (error) {
      rethrowOrWrap(error);
    }
  }

  const operation = flat as UntypedOperation;
  operation.raw = raw;
  return operation;
}
