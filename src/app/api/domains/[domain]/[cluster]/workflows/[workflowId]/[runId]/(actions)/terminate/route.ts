import { type NextRequest } from 'next/server';

import { terminateWorkflow } from '@/route-handlers/terminate-workflow/terminate-workflow';
import { type RouteParams } from '@/route-handlers/terminate-workflow/terminate-workflow.types';
import { routeHandlerWithMiddlewares } from '@/utils/route-handlers-middleware';
import routeHandlersDefaultMiddlewares from '@/utils/route-handlers-middleware/config/route-handlers-default-middlewares.config';

export async function POST(
  request: NextRequest,
  options: { params: Promise<RouteParams> }
) {
  const params = await options.params;
  return routeHandlerWithMiddlewares(
    terminateWorkflow,
    request,
    { params },
    routeHandlersDefaultMiddlewares
  );
}
