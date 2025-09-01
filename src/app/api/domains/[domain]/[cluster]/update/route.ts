import { type NextRequest } from 'next/server';

import { updateDomain } from '@/route-handlers/update-domain/update-domain';
import { type RouteParams } from '@/route-handlers/update-domain/update-domain.types';
import { routeHandlerWithMiddlewares } from '@/utils/route-handlers-middleware';
import routeHandlersDefaultMiddlewares from '@/utils/route-handlers-middleware/config/route-handlers-default-middlewares.config';

export async function POST(
  request: NextRequest,
  options: { params: Promise<RouteParams> }
) {
  const params = await options.params;
  return routeHandlerWithMiddlewares(
    updateDomain,
    request,
    { params },
    routeHandlersDefaultMiddlewares
  );
}
