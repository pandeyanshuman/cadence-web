import { type NextRequest } from 'next/server';

import { cancelWorkflow } from '@/route-handlers/cancel-workflow/cancel-workflow';
import { type RouteParams } from '@/route-handlers/cancel-workflow/cancel-workflow.types';
import { routeHandlerWithMiddlewares } from '@/utils/route-handlers-middleware';
import routeHandlersDefaultMiddlewares from '@/utils/route-handlers-middleware/config/route-handlers-default-middlewares.config';

export async function POST(
  request: NextRequest,
  options: { params: Promise<RouteParams> }
) {
  const params = await options.params;
  return routeHandlerWithMiddlewares(
    cancelWorkflow,
    request,
    { params },
    routeHandlersDefaultMiddlewares
  );
}
