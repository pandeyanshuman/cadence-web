import { type ZodIssue, type z } from 'zod';

import { type DefaultMiddlewaresContext } from '@/utils/route-handlers-middleware';
import { type DomainWorkflow } from '@/views/domain-page/domain-page.types';

import type listWorkflowsQueryParamSchema from './schemas/list-workflows-query-params-schema';

export type RouteParams = {
  domain: string;
  cluster: string;
};

export type RequestParams = {
  params: RouteParams;
};

export type ListWorkflowsRequestQueryParams = z.input<
  typeof listWorkflowsQueryParamSchema
>;

export type TimeColumn = ListWorkflowsRequestQueryParams['timeColumn'];

export type ListWorkflowsResponse = {
  workflows: Array<DomainWorkflow>;
  nextPage: string;
};

export type ListWorkflowsError = {
  error: string;
  validationErrors?: Array<ZodIssue>;
  message?: string;
};

export type Context = DefaultMiddlewaresContext;
