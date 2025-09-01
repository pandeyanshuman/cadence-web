import { type NextRequest } from 'next/server';

import { resetWorkflow } from '@/route-handlers/reset-workflow/reset-workflow';
import { type RouteParams } from '@/route-handlers/reset-workflow/reset-workflow.types';
import { routeHandlerWithMiddlewares } from '@/utils/route-handlers-middleware';
import routeHandlersDefaultMiddlewares from '@/utils/route-handlers-middleware/config/route-handlers-default-middlewares.config';

export async function POST(
  request: NextRequest,
  options: { params: Promise<RouteParams> }
) {
  const params = await options.params;
  return routeHandlerWithMiddlewares(
    resetWorkflow,
    request,
    { params },
    routeHandlersDefaultMiddlewares
  );
}
