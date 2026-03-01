import { z } from 'zod';

export const AccountFirstDayOfWeekSchema = z.enum([
  'friday',
  'monday',
  'saturday',
  'sunday',
  'thursday',
  'tuesday',
  'wednesday',
]);

export const ClientKindSchema = z.enum(['individual', 'organization']);

export const LayerSchema = z.enum(['contract', 'domain', 'http']);

export const LeaveRequestKindSchema = z.enum([
  'childcare',
  'other',
  'sick',
  'vacation',
]);

export const ServiceColorSchema = z.enum([
  'black',
  'blue',
  'gray',
  'green',
  'indigo',
  'orange',
  'pink',
  'red',
  'teal',
  'violet',
  'white',
  'yellow',
]);

export const ServiceIconSchema = z.enum([
  'bolt',
  'broom',
  'calendar',
  'check',
  'clock',
  'cross',
  'star',
  'truck',
  'user',
]);

export const SortDirectionSchema = z.enum(['asc', 'desc']);

export const TimeEntrySourceSchema = z.enum(['kiosk', 'manual', 'mobile']);

export const WorkPatternDayDaySchema = z.enum([
  'friday',
  'monday',
  'saturday',
  'sunday',
  'thursday',
  'tuesday',
  'wednesday',
]);

export const AccountFilterSchema: z.ZodType<AccountFilter> = z.lazy(() =>
  z.object({
    address: AddressFilterSchema.optional(),
    AND: z.array(AccountFilterSchema).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    currencyCode: z.union([z.string(), StringFilterSchema]).optional(),
    firstDayOfWeek: AccountFirstDayOfWeekFilterSchema.optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    localeCode: z.union([z.string(), StringFilterSchema]).optional(),
    name: z.union([z.string(), NullableStringFilterSchema]).optional(),
    NOT: AccountFilterSchema.optional(),
    OR: z.array(AccountFilterSchema).optional(),
    ownerId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const ActivityFilterSchema: z.ZodType<ActivityFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    AND: z.array(ActivityFilterSchema).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: ActivityFilterSchema.optional(),
    OR: z.array(ActivityFilterSchema).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const AddressFilterSchema: z.ZodType<AddressFilter> = z.lazy(() =>
  z.object({
    AND: z.array(AddressFilterSchema).optional(),
    city: z.union([z.string(), StringFilterSchema]).optional(),
    countryCode: z.union([z.string(), StringFilterSchema]).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: AddressFilterSchema.optional(),
    OR: z.array(AddressFilterSchema).optional(),
    postalCode: z.union([z.string(), StringFilterSchema]).optional(),
    region: z.union([z.string(), StringFilterSchema]).optional(),
    street: z.union([z.string(), StringFilterSchema]).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const AuditLogFilterSchema: z.ZodType<AuditLogFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), NullableUuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), NullableUuidFilterSchema]).optional(),
    AND: z.array(AuditLogFilterSchema).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: AuditLogFilterSchema.optional(),
    OR: z.array(AuditLogFilterSchema).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const BillableItemFilterSchema: z.ZodType<BillableItemFilter> = z.lazy(
  () =>
    z.object({
      accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      AND: z.array(BillableItemFilterSchema).optional(),
      billableId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      billableType: z.union([z.string(), StringFilterSchema]).optional(),
      billedAt: z
        .union([z.iso.datetime(), NullableDatetimeFilterSchema])
        .optional(),
      createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      currencyCode: z.union([z.string(), StringFilterSchema]).optional(),
      description: z.union([z.string(), StringFilterSchema]).optional(),
      id: z.union([z.uuid(), UuidFilterSchema]).optional(),
      NOT: BillableItemFilterSchema.optional(),
      OR: z.array(BillableItemFilterSchema).optional(),
      quantity: z.union([z.number(), DecimalFilterSchema]).optional(),
      rateCents: z.union([z.number().int(), IntegerFilterSchema]).optional(),
      totalCents: z.union([z.number().int(), IntegerFilterSchema]).optional(),
      updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    }),
);

export const ClientFilterSchema: z.ZodType<ClientFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    address: AddressFilterSchema.optional(),
    AND: z.array(ClientFilterSchema).optional(),
    archivedAt: z
      .union([z.iso.datetime(), NullableDatetimeFilterSchema])
      .optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    currencyCode: z.union([z.string(), StringFilterSchema]).optional(),
    email: z.union([z.string(), StringFilterSchema]).optional(),
    kind: ClientKindFilterSchema.optional(),
    name: z.union([z.string(), NullableStringFilterSchema]).optional(),
    NOT: ClientFilterSchema.optional(),
    note: z.union([z.string(), StringFilterSchema]).optional(),
    OR: z.array(ClientFilterSchema).optional(),
    phone: z.union([z.string(), StringFilterSchema]).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const CommentFilterSchema: z.ZodType<CommentFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    AND: z.array(CommentFilterSchema).optional(),
    body: z.union([z.string(), StringFilterSchema]).optional(),
    commentableId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    commentableType: z.union([z.string(), StringFilterSchema]).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: CommentFilterSchema.optional(),
    OR: z.array(CommentFilterSchema).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const CountryFilterSchema: z.ZodType<CountryFilter> = z.lazy(() =>
  z.object({
    AND: z.array(CountryFilterSchema).optional(),
    code: z.union([z.string(), StringFilterSchema]).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: CountryFilterSchema.optional(),
    OR: z.array(CountryFilterSchema).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const CurrencyFilterSchema: z.ZodType<CurrencyFilter> = z.lazy(() =>
  z.object({
    AND: z.array(CurrencyFilterSchema).optional(),
    code: z.union([z.string(), StringFilterSchema]).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: CurrencyFilterSchema.optional(),
    OR: z.array(CurrencyFilterSchema).optional(),
    symbol: z.union([z.string(), NullableStringFilterSchema]).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const EmployeeFilterSchema: z.ZodType<EmployeeFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    AND: z.array(EmployeeFilterSchema).optional(),
    birthOn: z.union([z.iso.date(), NullableDateFilterSchema]).optional(),
    email: z.union([z.string(), NullableStringFilterSchema]).optional(),
    firstName: z.union([z.string(), NullableStringFilterSchema]).optional(),
    lastName: z.union([z.string(), NullableStringFilterSchema]).optional(),
    NOT: EmployeeFilterSchema.optional(),
    note: z.union([z.string(), NullableStringFilterSchema]).optional(),
    OR: z.array(EmployeeFilterSchema).optional(),
    phone: z.union([z.string(), NullableStringFilterSchema]).optional(),
    userId: z.union([z.uuid(), NullableUuidFilterSchema]).optional(),
  }),
);

export const EventFilterSchema: z.ZodType<EventFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    AND: z.array(EventFilterSchema).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: EventFilterSchema.optional(),
    OR: z.array(EventFilterSchema).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const LeaveRequestFilterSchema: z.ZodType<LeaveRequestFilter> = z.lazy(
  () =>
    z.object({
      accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      AND: z.array(LeaveRequestFilterSchema).optional(),
      approvedAt: z
        .union([z.iso.datetime(), NullableDatetimeFilterSchema])
        .optional(),
      createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      employeeId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      endsAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      id: z.union([z.uuid(), UuidFilterSchema]).optional(),
      kind: LeaveRequestKindFilterSchema.optional(),
      NOT: LeaveRequestFilterSchema.optional(),
      note: z.union([z.string(), NullableStringFilterSchema]).optional(),
      OR: z.array(LeaveRequestFilterSchema).optional(),
      rejectedAt: z
        .union([z.iso.datetime(), NullableDatetimeFilterSchema])
        .optional(),
      startsAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    }),
);

export const LocaleFilterSchema: z.ZodType<LocaleFilter> = z.lazy(() =>
  z.object({
    AND: z.array(LocaleFilterSchema).optional(),
    code: z.union([z.string(), StringFilterSchema]).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: LocaleFilterSchema.optional(),
    OR: z.array(LocaleFilterSchema).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const RateFilterSchema: z.ZodType<RateFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    AND: z.array(RateFilterSchema).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    currencyCode: z.union([z.string(), StringFilterSchema]).optional(),
    effectiveFrom: z.union([z.iso.date(), DateFilterSchema]).optional(),
    effectiveUntil: z
      .union([z.iso.date(), NullableDateFilterSchema])
      .optional(),
    hourlyRateCents: z
      .union([z.number().int(), IntegerFilterSchema])
      .optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: RateFilterSchema.optional(),
    OR: z.array(RateFilterSchema).optional(),
    rateableId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    rateableType: z.union([z.string(), StringFilterSchema]).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const ScheduleFilterSchema: z.ZodType<ScheduleFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    AND: z.array(ScheduleFilterSchema).optional(),
    archivedAt: z
      .union([z.iso.datetime(), NullableDatetimeFilterSchema])
      .optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    endsOn: z.union([z.iso.date(), DateFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    name: z.union([z.string(), StringFilterSchema]).optional(),
    NOT: ScheduleFilterSchema.optional(),
    OR: z.array(ScheduleFilterSchema).optional(),
    publishedAt: z
      .union([z.iso.datetime(), NullableDatetimeFilterSchema])
      .optional(),
    startsOn: z.union([z.iso.date(), DateFilterSchema]).optional(),
    teamId: z.union([z.uuid(), NullableUuidFilterSchema]).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const ServiceFilterSchema: z.ZodType<ServiceFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    AND: z.array(ServiceFilterSchema).optional(),
    archivedAt: z
      .union([z.iso.datetime(), NullableDatetimeFilterSchema])
      .optional(),
    color: ServiceColorFilterSchema.optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    defaultDurationMinutes: z
      .union([z.number().int(), NullableIntegerFilterSchema])
      .optional(),
    description: z.union([z.string(), NullableStringFilterSchema]).optional(),
    icon: ServiceIconFilterSchema.optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    internal: z.union([z.boolean(), BooleanFilterSchema]).optional(),
    name: z.union([z.string(), StringFilterSchema]).optional(),
    NOT: ServiceFilterSchema.optional(),
    OR: z.array(ServiceFilterSchema).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const SessionFilterSchema: z.ZodType<SessionFilter> = z.lazy(() =>
  z.object({
    AND: z.array(SessionFilterSchema).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    expiresAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: SessionFilterSchema.optional(),
    OR: z.array(SessionFilterSchema).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    userId: z.union([z.uuid(), UuidFilterSchema]).optional(),
  }),
);

export const ShiftFilterSchema: z.ZodType<ShiftFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    AND: z.array(ShiftFilterSchema).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    endsAt: z
      .union([z.iso.datetime(), NullableDatetimeFilterSchema])
      .optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    NOT: ShiftFilterSchema.optional(),
    note: z.union([z.string(), StringFilterSchema]).optional(),
    OR: z.array(ShiftFilterSchema).optional(),
    scheduleId: z.union([z.uuid(), NullableUuidFilterSchema]).optional(),
    serviceId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    siteId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    startsAt: z
      .union([z.iso.datetime(), NullableDatetimeFilterSchema])
      .optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const ShiftSeriesFilterSchema: z.ZodType<ShiftSeriesFilter> = z.lazy(
  () =>
    z.object({
      accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      AND: z.array(ShiftSeriesFilterSchema).optional(),
      createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      durationMinutes: z
        .union([z.number().int(), IntegerFilterSchema])
        .optional(),
      id: z.union([z.uuid(), UuidFilterSchema]).optional(),
      NOT: ShiftSeriesFilterSchema.optional(),
      OR: z.array(ShiftSeriesFilterSchema).optional(),
      siteId: z.union([z.uuid(), NullableUuidFilterSchema]).optional(),
      startTime: z.union([z.string(), StringFilterSchema]).optional(),
      updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    }),
);

export const ShiftSwapRequestFilterSchema: z.ZodType<ShiftSwapRequestFilter> =
  z.lazy(() =>
    z.object({
      accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      AND: z.array(ShiftSwapRequestFilterSchema).optional(),
      approvedAt: z
        .union([z.iso.datetime(), NullableDatetimeFilterSchema])
        .optional(),
      cancelledAt: z
        .union([z.iso.datetime(), NullableDatetimeFilterSchema])
        .optional(),
      createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      id: z.union([z.uuid(), UuidFilterSchema]).optional(),
      NOT: ShiftSwapRequestFilterSchema.optional(),
      note: z.union([z.string(), NullableStringFilterSchema]).optional(),
      OR: z.array(ShiftSwapRequestFilterSchema).optional(),
      proposedEmployeeId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      rejectedAt: z
        .union([z.iso.datetime(), NullableDatetimeFilterSchema])
        .optional(),
      requestedByEmployeeId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      shiftId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    }),
  );

export const SiteFilterSchema: z.ZodType<SiteFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    address: AddressFilterSchema.optional(),
    AND: z.array(SiteFilterSchema).optional(),
    clientId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    currencyCode: z.union([z.string(), StringFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    name: z.union([z.string(), StringFilterSchema]).optional(),
    NOT: SiteFilterSchema.optional(),
    note: z.union([z.string(), StringFilterSchema]).optional(),
    OR: z.array(SiteFilterSchema).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const TeamFilterSchema: z.ZodType<TeamFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    AND: z.array(TeamFilterSchema).optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    description: z.union([z.string(), StringFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    name: z.union([z.string(), StringFilterSchema]).optional(),
    NOT: TeamFilterSchema.optional(),
    OR: z.array(TeamFilterSchema).optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const TimeEntryFilterSchema: z.ZodType<TimeEntryFilter> = z.lazy(() =>
  z.object({
    accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    AND: z.array(TimeEntryFilterSchema).optional(),
    approvedAt: z
      .union([z.iso.datetime(), NullableDatetimeFilterSchema])
      .optional(),
    createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    durationSeconds: z
      .union([z.number().int(), NullableIntegerFilterSchema])
      .optional(),
    employeeId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    id: z.union([z.uuid(), UuidFilterSchema]).optional(),
    lockedAt: z
      .union([z.iso.datetime(), NullableDatetimeFilterSchema])
      .optional(),
    NOT: TimeEntryFilterSchema.optional(),
    note: z.union([z.string(), StringFilterSchema]).optional(),
    OR: z.array(TimeEntryFilterSchema).optional(),
    shiftId: z.union([z.uuid(), NullableUuidFilterSchema]).optional(),
    siteId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    source: TimeEntrySourceFilterSchema.optional(),
    startedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    status: z.union([z.string(), StringFilterSchema]).optional(),
    stoppedAt: z
      .union([z.iso.datetime(), NullableDatetimeFilterSchema])
      .optional(),
    updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
  }),
);

export const WorkPatternDayFilterSchema: z.ZodType<WorkPatternDayFilter> =
  z.lazy(() =>
    z.object({
      AND: z.array(WorkPatternDayFilterSchema).optional(),
      createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      day: WorkPatternDayDayFilterSchema.optional(),
      enabled: z.union([z.boolean(), BooleanFilterSchema]).optional(),
      id: z.union([z.uuid(), UuidFilterSchema]).optional(),
      intervals: WorkPatternDayIntervalFilterSchema.optional(),
      NOT: WorkPatternDayFilterSchema.optional(),
      OR: z.array(WorkPatternDayFilterSchema).optional(),
      updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      workPatternId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    }),
  );

export const WorkPatternDayIntervalFilterSchema: z.ZodType<WorkPatternDayIntervalFilter> =
  z.lazy(() =>
    z.object({
      AND: z.array(WorkPatternDayIntervalFilterSchema).optional(),
      createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      endTime: z.union([z.string(), StringFilterSchema]).optional(),
      id: z.union([z.uuid(), UuidFilterSchema]).optional(),
      NOT: WorkPatternDayIntervalFilterSchema.optional(),
      OR: z.array(WorkPatternDayIntervalFilterSchema).optional(),
      startTime: z.union([z.string(), StringFilterSchema]).optional(),
      updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      workPatternDayId: z.union([z.uuid(), UuidFilterSchema]).optional(),
    }),
  );

export const WorkPatternFilterSchema: z.ZodType<WorkPatternFilter> = z.lazy(
  () =>
    z.object({
      accountId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      actorId: z.union([z.uuid(), UuidFilterSchema]).optional(),
      AND: z.array(WorkPatternFilterSchema).optional(),
      createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      days: WorkPatternDayFilterSchema.optional(),
      endsOn: z.union([z.iso.date(), NullableDateFilterSchema]).optional(),
      id: z.union([z.uuid(), UuidFilterSchema]).optional(),
      name: z.union([z.string(), StringFilterSchema]).optional(),
      NOT: WorkPatternFilterSchema.optional(),
      note: z.union([z.string(), StringFilterSchema]).optional(),
      OR: z.array(WorkPatternFilterSchema).optional(),
      startsOn: z.union([z.iso.date(), DateFilterSchema]).optional(),
      updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    }),
);

export const WorkPatternTemplateFilterSchema: z.ZodType<WorkPatternTemplateFilter> =
  z.lazy(() =>
    z.object({
      AND: z.array(WorkPatternTemplateFilterSchema).optional(),
      code: z.union([z.string(), StringFilterSchema]).optional(),
      createdAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
      id: z.union([z.uuid(), UuidFilterSchema]).optional(),
      name: z.union([z.string(), StringFilterSchema]).optional(),
      NOT: WorkPatternTemplateFilterSchema.optional(),
      OR: z.array(WorkPatternTemplateFilterSchema).optional(),
      updatedAt: z.union([z.iso.datetime(), DatetimeFilterSchema]).optional(),
    }),
  );

export const AccountFirstDayOfWeekFilterSchema = z.union([
  AccountFirstDayOfWeekSchema,
  z
    .object({
      eq: AccountFirstDayOfWeekSchema,
      in: z.array(AccountFirstDayOfWeekSchema),
    })
    .partial(),
]);

export const AccountPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const ActivitySchema = z.object({
  accountId: z.uuid(),
  createdAt: z.iso.datetime(),
  id: z.uuid(),
  updatedAt: z.iso.datetime(),
});

export const ActivityPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const ActivitySortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const AddressSchema = z.object({
  city: z.string(),
  countryCode: z.string(),
  createdAt: z.iso.datetime(),
  id: z.uuid(),
  postalCode: z.string(),
  region: z.string(),
  street: z.string(),
  updatedAt: z.iso.datetime(),
});

export const AddressNestedCreatePayloadSchema = z.object({
  city: z.string().optional(),
  countryCode: z.string(),
  OP: z.literal('create').optional(),
  postalCode: z.string().optional(),
  region: z.string().optional(),
  street: z.string().optional(),
});

export const AddressNestedDeletePayloadSchema = z.object({
  id: z.uuid(),
  OP: z.literal('delete').optional(),
});

export const AddressNestedUpdatePayloadSchema = z.object({
  city: z.string().optional(),
  countryCode: z.string().optional(),
  id: z.uuid().optional(),
  OP: z.literal('update').optional(),
  postalCode: z.string().optional(),
  region: z.string().optional(),
  street: z.string().optional(),
});

export const AddressSortSchema = z.object({
  city: SortDirectionSchema.optional(),
  countryCode: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  postalCode: SortDirectionSchema.optional(),
  region: SortDirectionSchema.optional(),
  street: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const AuditLogSchema = z.object({
  accountId: z.uuid().nullable(),
  actorId: z.uuid().nullable(),
  createdAt: z.iso.datetime(),
  id: z.uuid(),
  updatedAt: z.iso.datetime(),
});

export const AuditLogPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const AuditLogSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const BillableItemSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  billableId: z.uuid(),
  billableType: z.string(),
  billedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  currencyCode: z.string(),
  description: z.string(),
  id: z.uuid(),
  quantity: z.number(),
  rateCents: z.number().int(),
  totalCents: z.number().int(),
  updatedAt: z.iso.datetime(),
});

export const BillableItemCreatePayloadSchema = z.object({
  billableId: z.uuid(),
  billableType: z.string(),
  currencyCode: z.string().optional(),
  description: z.string(),
  quantity: z.number().optional(),
  rateCents: z.number().int(),
  totalCents: z.number().int(),
});

export const BillableItemPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const BillableItemSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  billableId: SortDirectionSchema.optional(),
  billableType: SortDirectionSchema.optional(),
  billedAt: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  currencyCode: SortDirectionSchema.optional(),
  description: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  quantity: SortDirectionSchema.optional(),
  rateCents: SortDirectionSchema.optional(),
  totalCents: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const BillableItemUpdatePayloadSchema = z.object({
  billableId: z.uuid().optional(),
  billableType: z.string().optional(),
  currencyCode: z.string().optional(),
  description: z.string().optional(),
  quantity: z.number().optional(),
  rateCents: z.number().int().optional(),
  totalCents: z.number().int().optional(),
});

export const BooleanFilterSchema = z.object({
  eq: z.boolean().optional(),
});

export const ClientKindFilterSchema = z.union([
  ClientKindSchema,
  z.object({ eq: ClientKindSchema, in: z.array(ClientKindSchema) }).partial(),
]);

export const ClientPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const CommentSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  body: z.string(),
  commentableId: z.uuid(),
  commentableType: z.string(),
  createdAt: z.iso.datetime(),
  id: z.uuid(),
  updatedAt: z.iso.datetime(),
});

export const CommentCreatePayloadSchema = z.object({
  body: z.string(),
  commentableId: z.uuid(),
  commentableType: z.string(),
});

export const CommentPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const CommentSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  body: SortDirectionSchema.optional(),
  commentableId: SortDirectionSchema.optional(),
  commentableType: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const CommentUpdatePayloadSchema = z.object({
  body: z.string().optional(),
  commentableId: z.uuid().optional(),
  commentableType: z.string().optional(),
});

export const CountrySchema = z.object({
  code: z.string(),
  createdAt: z.iso.datetime(),
  currencyCodes: z.unknown(),
  id: z.uuid(),
  updatedAt: z.iso.datetime(),
});

export const CountryPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const CountrySortSchema = z.object({
  code: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  currencyCodes: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const CurrencySchema = z.object({
  code: z.string(),
  createdAt: z.iso.datetime(),
  id: z.uuid(),
  symbol: z.string().nullable(),
  updatedAt: z.iso.datetime(),
});

export const CurrencyPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const CurrencySortSchema = z.object({
  code: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  symbol: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const DateFilterBetweenSchema = z.object({
  from: z.iso.date().optional(),
  to: z.iso.date().optional(),
});

export const DatetimeFilterBetweenSchema = z.object({
  from: z.iso.datetime().optional(),
  to: z.iso.datetime().optional(),
});

export const DecimalFilterBetweenSchema = z.object({
  from: z.number().optional(),
  to: z.number().optional(),
});

export const EmployeeSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  birthOn: z.iso.date().nullable(),
  email: z.string().nullable(),
  firstName: z.string().nullable(),
  fullName: z.unknown(),
  lastName: z.string().nullable(),
  note: z.string().nullable(),
  phone: z.string().nullable(),
  userId: z.uuid().nullable(),
});

export const EmployeeCreatePayloadSchema = z.object({
  birthOn: z.iso.date().nullable().optional(),
  email: z.string().nullable().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
});

export const EmployeePageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const EmployeeSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  birthOn: SortDirectionSchema.optional(),
  email: SortDirectionSchema.optional(),
  firstName: SortDirectionSchema.optional(),
  lastName: SortDirectionSchema.optional(),
  note: SortDirectionSchema.optional(),
  phone: SortDirectionSchema.optional(),
  userId: SortDirectionSchema.optional(),
});

export const EmployeeUpdatePayloadSchema = z.object({
  birthOn: z.iso.date().nullable().optional(),
  email: z.string().nullable().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
});

export const EventSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  createdAt: z.iso.datetime(),
  id: z.uuid(),
  updatedAt: z.iso.datetime(),
});

export const EventPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const EventSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const IntegerFilterBetweenSchema = z.object({
  from: z.number().int().optional(),
  to: z.number().int().optional(),
});

export const InviteSchema = z.object({
  acceptedAt: z.iso.datetime().nullable(),
  accountId: z.uuid(),
  actorId: z.uuid(),
  createdAt: z.iso.datetime(),
  email: z.string(),
  employeeId: z.uuid().nullable(),
  id: z.uuid(),
  role: z.string(),
  token: z.string(),
  updatedAt: z.iso.datetime(),
});

export const InviteUpdatePayloadSchema = z.object({
  email: z.string().optional(),
  employeeId: z.uuid().nullable().optional(),
  role: z.string().optional(),
});

export const IssueSchema = z.object({
  code: z.string(),
  detail: z.string(),
  meta: z.record(z.string(), z.unknown()),
  path: z.array(z.string()),
  pointer: z.string(),
});

export const LeaveRequestSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  approvedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  employeeId: z.uuid(),
  endsAt: z.iso.datetime(),
  id: z.uuid(),
  kind: LeaveRequestKindSchema,
  note: z.string().nullable(),
  rejectedAt: z.iso.datetime().nullable(),
  startsAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const LeaveRequestCreatePayloadSchema = z.object({
  employeeId: z.uuid(),
  endsAt: z.iso.datetime(),
  kind: LeaveRequestKindSchema.optional(),
  note: z.string().nullable().optional(),
  startsAt: z.iso.datetime(),
});

export const LeaveRequestKindFilterSchema = z.union([
  LeaveRequestKindSchema,
  z
    .object({ eq: LeaveRequestKindSchema, in: z.array(LeaveRequestKindSchema) })
    .partial(),
]);

export const LeaveRequestPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const LeaveRequestSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  approvedAt: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  employeeId: SortDirectionSchema.optional(),
  endsAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  kind: SortDirectionSchema.optional(),
  note: SortDirectionSchema.optional(),
  rejectedAt: SortDirectionSchema.optional(),
  startsAt: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const LeaveRequestUpdatePayloadSchema = z.object({
  employeeId: z.uuid().optional(),
  endsAt: z.iso.datetime().optional(),
  kind: LeaveRequestKindSchema.optional(),
  note: z.string().nullable().optional(),
  startsAt: z.iso.datetime().optional(),
});

export const LocaleSchema = z.object({
  code: z.string(),
  createdAt: z.iso.datetime(),
  id: z.uuid(),
  updatedAt: z.iso.datetime(),
});

export const LocalePageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(2000).optional(),
});

export const LocaleSortSchema = z.object({
  code: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const NullableStringFilterSchema = z.object({
  contains: z.string().optional(),
  endsWith: z.string().optional(),
  eq: z.string().optional(),
  in: z.array(z.string()).optional(),
  null: z.boolean().optional(),
  startsWith: z.string().optional(),
});

export const NullableUuidFilterSchema = z.object({
  eq: z.uuid().optional(),
  in: z.array(z.uuid()).optional(),
  null: z.boolean().optional(),
});

export const OffsetPaginationSchema = z.object({
  current: z.number().int(),
  items: z.number().int(),
  next: z.number().int().nullable().optional(),
  prev: z.number().int().nullable().optional(),
  total: z.number().int(),
});

export const RateSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  createdAt: z.iso.datetime(),
  currencyCode: z.string(),
  effectiveFrom: z.iso.date(),
  effectiveUntil: z.iso.date().nullable(),
  hourlyRateCents: z.number().int(),
  id: z.uuid(),
  rateableId: z.uuid(),
  rateableType: z.string(),
  updatedAt: z.iso.datetime(),
});

export const RateCreatePayloadSchema = z.object({
  currencyCode: z.string().optional(),
  effectiveFrom: z.iso.date(),
  effectiveUntil: z.iso.date().nullable().optional(),
  hourlyRateCents: z.number().int(),
  rateableId: z.uuid(),
  rateableType: z.string(),
});

export const RatePageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const RateSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  currencyCode: SortDirectionSchema.optional(),
  effectiveFrom: SortDirectionSchema.optional(),
  effectiveUntil: SortDirectionSchema.optional(),
  hourlyRateCents: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  rateableId: SortDirectionSchema.optional(),
  rateableType: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const RateUpdatePayloadSchema = z.object({
  currencyCode: z.string().optional(),
  effectiveFrom: z.iso.date().optional(),
  effectiveUntil: z.iso.date().nullable().optional(),
  hourlyRateCents: z.number().int().optional(),
  rateableId: z.uuid().optional(),
  rateableType: z.string().optional(),
});

export const ScheduleSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  archivedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  endsOn: z.iso.date(),
  id: z.uuid(),
  name: z.string(),
  publishedAt: z.iso.datetime().nullable(),
  startsOn: z.iso.date(),
  status: z.unknown(),
  teamId: z.uuid().nullable(),
  updatedAt: z.iso.datetime(),
});

export const ScheduleCreatePayloadSchema = z.object({
  endsOn: z.iso.date(),
  name: z.string(),
  startsOn: z.iso.date(),
  teamId: z.uuid().nullable().optional(),
});

export const SchedulePageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const ScheduleSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  archivedAt: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  endsOn: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  name: SortDirectionSchema.optional(),
  publishedAt: SortDirectionSchema.optional(),
  startsOn: SortDirectionSchema.optional(),
  status: SortDirectionSchema.optional(),
  teamId: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const ScheduleUpdatePayloadSchema = z.object({
  endsOn: z.iso.date().optional(),
  name: z.string().optional(),
  startsOn: z.iso.date().optional(),
  teamId: z.uuid().nullable().optional(),
});

export const ServiceSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  archivedAt: z.iso.datetime().nullable(),
  color: ServiceColorSchema,
  createdAt: z.iso.datetime(),
  defaultDurationMinutes: z.number().int().nullable(),
  description: z.string().nullable(),
  icon: ServiceIconSchema,
  id: z.uuid(),
  internal: z.boolean(),
  name: z.string(),
  updatedAt: z.iso.datetime(),
});

export const ServiceColorFilterSchema = z.union([
  ServiceColorSchema,
  z
    .object({ eq: ServiceColorSchema, in: z.array(ServiceColorSchema) })
    .partial(),
]);

export const ServiceCreatePayloadSchema = z.object({
  color: ServiceColorSchema,
  defaultDurationMinutes: z.number().int().nullable().optional(),
  description: z.string().nullable().optional(),
  icon: ServiceIconSchema,
  internal: z.boolean(),
  name: z.string(),
});

export const ServiceIconFilterSchema = z.union([
  ServiceIconSchema,
  z.object({ eq: ServiceIconSchema, in: z.array(ServiceIconSchema) }).partial(),
]);

export const ServicePageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const ServiceSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  archivedAt: SortDirectionSchema.optional(),
  color: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  defaultDurationMinutes: SortDirectionSchema.optional(),
  description: SortDirectionSchema.optional(),
  icon: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  internal: SortDirectionSchema.optional(),
  name: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const ServiceUpdatePayloadSchema = z.object({
  color: ServiceColorSchema.optional(),
  defaultDurationMinutes: z.number().int().nullable().optional(),
  description: z.string().nullable().optional(),
  icon: ServiceIconSchema.optional(),
  internal: z.boolean().optional(),
  name: z.string().optional(),
});

export const SessionSchema = z.object({
  createdAt: z.iso.datetime(),
  expiresAt: z.iso.datetime(),
  id: z.uuid(),
  updatedAt: z.iso.datetime(),
  userId: z.uuid(),
});

export const SessionPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const SessionSortSchema = z.object({
  createdAt: SortDirectionSchema.optional(),
  expiresAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
  userId: SortDirectionSchema.optional(),
});

export const ShiftSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  createdAt: z.iso.datetime(),
  endsAt: z.iso.datetime().nullable(),
  id: z.uuid(),
  note: z.string(),
  scheduleId: z.uuid().nullable(),
  serviceId: z.uuid(),
  siteId: z.uuid(),
  startsAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime(),
});

export const ShiftCreatePayloadSchema = z.object({
  endsAt: z.iso.datetime().nullable().optional(),
  note: z.string().optional(),
  serviceId: z.uuid(),
  siteId: z.uuid(),
  startsAt: z.iso.datetime().nullable().optional(),
});

export const ShiftPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const ShiftSeriesSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  createdAt: z.iso.datetime(),
  durationMinutes: z.number().int(),
  id: z.uuid(),
  siteId: z.uuid().nullable(),
  startTime: z.string(),
  updatedAt: z.iso.datetime(),
});

export const ShiftSeriesCreatePayloadSchema = z.object({
  durationMinutes: z.number().int(),
  siteId: z.uuid().nullable().optional(),
  startTime: z.string(),
});

export const ShiftSeriesPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const ShiftSeriesSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  durationMinutes: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  siteId: SortDirectionSchema.optional(),
  startTime: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const ShiftSeriesUpdatePayloadSchema = z.object({
  durationMinutes: z.number().int().optional(),
  siteId: z.uuid().nullable().optional(),
  startTime: z.string().optional(),
});

export const ShiftSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  endsAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  note: SortDirectionSchema.optional(),
  scheduleId: SortDirectionSchema.optional(),
  serviceId: SortDirectionSchema.optional(),
  siteId: SortDirectionSchema.optional(),
  startsAt: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const ShiftSwapRequestSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  approvedAt: z.iso.datetime().nullable(),
  cancelledAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  id: z.uuid(),
  note: z.string().nullable(),
  proposedEmployeeId: z.uuid(),
  rejectedAt: z.iso.datetime().nullable(),
  requestedByEmployeeId: z.uuid(),
  shiftId: z.uuid(),
  updatedAt: z.iso.datetime(),
});

export const ShiftSwapRequestCreatePayloadSchema = z.object({
  note: z.string().nullable().optional(),
  proposedEmployeeId: z.uuid(),
  requestedByEmployeeId: z.uuid(),
  shiftId: z.uuid(),
});

export const ShiftSwapRequestPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const ShiftSwapRequestSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  approvedAt: SortDirectionSchema.optional(),
  cancelledAt: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  note: SortDirectionSchema.optional(),
  proposedEmployeeId: SortDirectionSchema.optional(),
  rejectedAt: SortDirectionSchema.optional(),
  requestedByEmployeeId: SortDirectionSchema.optional(),
  shiftId: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const ShiftSwapRequestUpdatePayloadSchema = z.object({
  note: z.string().nullable().optional(),
  proposedEmployeeId: z.uuid().optional(),
  requestedByEmployeeId: z.uuid().optional(),
  shiftId: z.uuid().optional(),
});

export const ShiftUpdatePayloadSchema = z.object({
  endsAt: z.iso.datetime().nullable().optional(),
  note: z.string().optional(),
  serviceId: z.uuid().optional(),
  siteId: z.uuid().optional(),
  startsAt: z.iso.datetime().nullable().optional(),
});

export const SitePageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const StringFilterSchema = z.object({
  contains: z.string().optional(),
  endsWith: z.string().optional(),
  eq: z.string().optional(),
  in: z.array(z.string()).optional(),
  startsWith: z.string().optional(),
});

export const TeamSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  createdAt: z.iso.datetime(),
  description: z.string(),
  id: z.uuid(),
  name: z.string(),
  updatedAt: z.iso.datetime(),
});

export const TeamCreatePayloadSchema = z.object({
  description: z.string().optional(),
  name: z.string(),
});

export const TeamPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const TeamSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  description: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  name: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const TeamUpdatePayloadSchema = z.object({
  description: z.string().optional(),
  name: z.string().optional(),
});

export const TimeEntrySchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  approvedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  durationSeconds: z.number().int().nullable(),
  employeeId: z.uuid(),
  id: z.uuid(),
  lockedAt: z.iso.datetime().nullable(),
  note: z.string(),
  shiftId: z.uuid().nullable(),
  siteId: z.uuid(),
  source: TimeEntrySourceSchema,
  startedAt: z.iso.datetime(),
  status: z.string(),
  stoppedAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime(),
});

export const TimeEntryCreatePayloadSchema = z.object({
  employeeId: z.uuid(),
  note: z.string().optional(),
  shiftId: z.uuid().nullable().optional(),
  siteId: z.uuid(),
  source: TimeEntrySourceSchema.optional(),
  startedAt: z.iso.datetime(),
});

export const TimeEntryPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const TimeEntrySortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  approvedAt: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  durationSeconds: SortDirectionSchema.optional(),
  employeeId: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  lockedAt: SortDirectionSchema.optional(),
  note: SortDirectionSchema.optional(),
  shiftId: SortDirectionSchema.optional(),
  siteId: SortDirectionSchema.optional(),
  source: SortDirectionSchema.optional(),
  startedAt: SortDirectionSchema.optional(),
  status: SortDirectionSchema.optional(),
  stoppedAt: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const TimeEntrySourceFilterSchema = z.union([
  TimeEntrySourceSchema,
  z
    .object({ eq: TimeEntrySourceSchema, in: z.array(TimeEntrySourceSchema) })
    .partial(),
]);

export const TimeEntryUpdatePayloadSchema = z.object({
  employeeId: z.uuid().optional(),
  note: z.string().optional(),
  shiftId: z.uuid().nullable().optional(),
  siteId: z.uuid().optional(),
  source: TimeEntrySourceSchema.optional(),
  startedAt: z.iso.datetime().optional(),
});

export const UserSchema = z.object({
  createdAt: z.iso.datetime(),
  email: z.string().nullable(),
  firstName: z.string().nullable(),
  fullName: z.unknown(),
  id: z.uuid(),
  lastName: z.string(),
  localeCode: z.string().nullable(),
  notificationSettings: z.unknown(),
  notificationSettingsHash: z.unknown(),
  phone: z.string().nullable(),
  updatedAt: z.iso.datetime(),
});

export const UserUpdatePayloadSchema = z.object({
  email: z.string().nullable().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().optional(),
  localeCode: z.string().nullable().optional(),
  notificationSettingsHash: z.unknown().optional(),
  phone: z.string().nullable().optional(),
});

export const UuidFilterSchema = z.object({
  eq: z.uuid().optional(),
  in: z.array(z.uuid()).optional(),
});

export const WorkPatternDayDayFilterSchema = z.union([
  WorkPatternDayDaySchema,
  z
    .object({
      eq: WorkPatternDayDaySchema,
      in: z.array(WorkPatternDayDaySchema),
    })
    .partial(),
]);

export const WorkPatternDayIntervalSchema = z.object({
  createdAt: z.iso.datetime(),
  endTime: z.string(),
  id: z.uuid(),
  startTime: z.string(),
  updatedAt: z.iso.datetime(),
  workPatternDayId: z.uuid(),
});

export const WorkPatternDayIntervalNestedCreatePayloadSchema = z.object({
  endTime: z.string(),
  OP: z.literal('create').optional(),
  startTime: z.string(),
  workPatternDayId: z.uuid(),
});

export const WorkPatternDayIntervalNestedDeletePayloadSchema = z.object({
  id: z.uuid(),
  OP: z.literal('delete').optional(),
});

export const WorkPatternDayIntervalNestedUpdatePayloadSchema = z.object({
  endTime: z.string().optional(),
  id: z.uuid().optional(),
  OP: z.literal('update').optional(),
  startTime: z.string().optional(),
  workPatternDayId: z.uuid().optional(),
});

export const WorkPatternDayIntervalSortSchema = z.object({
  createdAt: SortDirectionSchema.optional(),
  endTime: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  startTime: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
  workPatternDayId: SortDirectionSchema.optional(),
});

export const WorkPatternDayNestedDeletePayloadSchema = z.object({
  id: z.uuid(),
  OP: z.literal('delete').optional(),
});

export const WorkPatternPageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const WorkPatternTemplateSchema = z.object({
  code: z.string(),
  createdAt: z.iso.datetime(),
  id: z.uuid(),
  name: z.string(),
  updatedAt: z.iso.datetime(),
});

export const WorkPatternTemplatePageSchema = z.object({
  number: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
});

export const WorkPatternTemplateSortSchema = z.object({
  code: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  name: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const AccountSchema = z.object({
  address: AddressSchema,
  createdAt: z.iso.datetime(),
  currencyCode: z.string(),
  firstDayOfWeek: AccountFirstDayOfWeekSchema,
  id: z.uuid(),
  localeCode: z.string(),
  name: z.string().nullable(),
  ownerId: z.uuid(),
  updatedAt: z.iso.datetime(),
});

export const AccountSortSchema = z.object({
  address: AddressSortSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  currencyCode: SortDirectionSchema.optional(),
  firstDayOfWeek: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  localeCode: SortDirectionSchema.optional(),
  name: SortDirectionSchema.optional(),
  ownerId: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const AddressNestedPayloadSchema = z.discriminatedUnion('OP', [
  AddressNestedCreatePayloadSchema,
  AddressNestedUpdatePayloadSchema,
  AddressNestedDeletePayloadSchema,
]);

export const ClientSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  address: AddressSchema,
  archivedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  currencyCode: z.string(),
  email: z.email(),
  kind: ClientKindSchema.nullable(),
  name: z.string().nullable(),
  note: z.string(),
  phone: z.string(),
  updatedAt: z.iso.datetime(),
});

export const ClientSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  address: AddressSortSchema.optional(),
  archivedAt: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  currencyCode: SortDirectionSchema.optional(),
  email: SortDirectionSchema.optional(),
  kind: SortDirectionSchema.optional(),
  name: SortDirectionSchema.optional(),
  note: SortDirectionSchema.optional(),
  phone: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const DateFilterSchema = z.object({
  between: DateFilterBetweenSchema.optional(),
  eq: z.iso.date().optional(),
  gt: z.iso.date().optional(),
  gte: z.iso.date().optional(),
  in: z.array(z.iso.date()).optional(),
  lt: z.iso.date().optional(),
  lte: z.iso.date().optional(),
});

export const DatetimeFilterSchema = z.object({
  between: DatetimeFilterBetweenSchema.optional(),
  eq: z.iso.datetime().optional(),
  gt: z.iso.datetime().optional(),
  gte: z.iso.datetime().optional(),
  in: z.array(z.iso.datetime()).optional(),
  lt: z.iso.datetime().optional(),
  lte: z.iso.datetime().optional(),
});

export const DecimalFilterSchema = z.object({
  between: DecimalFilterBetweenSchema.optional(),
  eq: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  in: z.array(z.number()).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
});

export const ErrorSchema = z.object({
  issues: z.array(IssueSchema),
  layer: LayerSchema,
});

export const IntegerFilterSchema = z.object({
  between: IntegerFilterBetweenSchema.optional(),
  eq: z.number().int().optional(),
  gt: z.number().int().optional(),
  gte: z.number().int().optional(),
  in: z.array(z.number().int()).optional(),
  lt: z.number().int().optional(),
  lte: z.number().int().optional(),
});

export const NullableDateFilterSchema = z.object({
  between: DateFilterBetweenSchema.optional(),
  eq: z.iso.date().optional(),
  gt: z.iso.date().optional(),
  gte: z.iso.date().optional(),
  in: z.array(z.iso.date()).optional(),
  lt: z.iso.date().optional(),
  lte: z.iso.date().optional(),
  null: z.boolean().optional(),
});

export const NullableDatetimeFilterSchema = z.object({
  between: DatetimeFilterBetweenSchema.optional(),
  eq: z.iso.datetime().optional(),
  gt: z.iso.datetime().optional(),
  gte: z.iso.datetime().optional(),
  in: z.array(z.iso.datetime()).optional(),
  lt: z.iso.datetime().optional(),
  lte: z.iso.datetime().optional(),
  null: z.boolean().optional(),
});

export const NullableIntegerFilterSchema = z.object({
  between: IntegerFilterBetweenSchema.optional(),
  eq: z.number().int().optional(),
  gt: z.number().int().optional(),
  gte: z.number().int().optional(),
  in: z.array(z.number().int()).optional(),
  lt: z.number().int().optional(),
  lte: z.number().int().optional(),
  null: z.boolean().optional(),
});

export const SiteSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  address: AddressSchema,
  clientId: z.uuid(),
  createdAt: z.iso.datetime(),
  currencyCode: z.string(),
  id: z.uuid(),
  name: z.string(),
  note: z.string(),
  updatedAt: z.iso.datetime(),
});

export const SiteSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  address: AddressSortSchema.optional(),
  clientId: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  currencyCode: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  name: SortDirectionSchema.optional(),
  note: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const WorkPatternDaySchema = z.object({
  createdAt: z.iso.datetime(),
  day: WorkPatternDayDaySchema,
  enabled: z.boolean(),
  id: z.uuid(),
  intervals: z.array(WorkPatternDayIntervalSchema),
  updatedAt: z.iso.datetime(),
  workPatternId: z.uuid(),
});

export const WorkPatternDayIntervalNestedPayloadSchema = z.discriminatedUnion(
  'OP',
  [
    WorkPatternDayIntervalNestedCreatePayloadSchema,
    WorkPatternDayIntervalNestedUpdatePayloadSchema,
    WorkPatternDayIntervalNestedDeletePayloadSchema,
  ],
);

export const WorkPatternDaySortSchema = z.object({
  createdAt: SortDirectionSchema.optional(),
  day: SortDirectionSchema.optional(),
  enabled: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  intervals: WorkPatternDayIntervalSortSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
  workPatternId: SortDirectionSchema.optional(),
});

export const AccountCreatePayloadSchema = z.object({
  address: AddressNestedPayloadSchema.optional(),
  currencyCode: z.string(),
  firstDayOfWeek: AccountFirstDayOfWeekSchema.optional(),
  localeCode: z.string(),
  name: z.string().nullable().optional(),
});

export const AccountUpdatePayloadSchema = z.object({
  address: AddressNestedPayloadSchema.optional(),
  currencyCode: z.string().optional(),
  firstDayOfWeek: AccountFirstDayOfWeekSchema.optional(),
  localeCode: z.string().optional(),
  name: z.string().nullable().optional(),
});

export const ClientCreatePayloadSchema = z.object({
  address: AddressNestedPayloadSchema.optional(),
  currencyCode: z.string(),
  email: z.email().optional(),
  kind: ClientKindSchema.nullable().optional(),
  name: z.string().nullable().optional(),
  note: z.string().optional(),
  phone: z.string().optional(),
});

export const ClientUpdatePayloadSchema = z.object({
  address: AddressNestedPayloadSchema.optional(),
  currencyCode: z.string().optional(),
  email: z.email().optional(),
  kind: ClientKindSchema.nullable().optional(),
  name: z.string().nullable().optional(),
  note: z.string().optional(),
  phone: z.string().optional(),
});

export const ErrorResponseBodySchema = ErrorSchema;

export const SiteCreatePayloadSchema = z.object({
  address: AddressNestedPayloadSchema.optional(),
  clientId: z.uuid(),
  name: z.string(),
  note: z.string().optional(),
});

export const SiteUpdatePayloadSchema = z.object({
  address: AddressNestedPayloadSchema.optional(),
  clientId: z.uuid().optional(),
  name: z.string().optional(),
  note: z.string().optional(),
});

export const WorkPatternSchema = z.object({
  accountId: z.uuid(),
  actorId: z.uuid(),
  createdAt: z.iso.datetime(),
  days: z.array(WorkPatternDaySchema),
  endsOn: z.iso.date().nullable(),
  id: z.uuid(),
  name: z.string(),
  note: z.string(),
  startsOn: z.iso.date(),
  updatedAt: z.iso.datetime(),
});

export const WorkPatternDayNestedCreatePayloadSchema = z.object({
  day: WorkPatternDayDaySchema,
  enabled: z.boolean().optional(),
  intervals: z.array(WorkPatternDayIntervalNestedPayloadSchema).optional(),
  OP: z.literal('create').optional(),
  workPatternId: z.uuid(),
});

export const WorkPatternDayNestedUpdatePayloadSchema = z.object({
  day: WorkPatternDayDaySchema.optional(),
  enabled: z.boolean().optional(),
  id: z.uuid().optional(),
  intervals: z.array(WorkPatternDayIntervalNestedPayloadSchema).optional(),
  OP: z.literal('update').optional(),
  workPatternId: z.uuid().optional(),
});

export const WorkPatternSortSchema = z.object({
  accountId: SortDirectionSchema.optional(),
  actorId: SortDirectionSchema.optional(),
  createdAt: SortDirectionSchema.optional(),
  days: WorkPatternDaySortSchema.optional(),
  endsOn: SortDirectionSchema.optional(),
  id: SortDirectionSchema.optional(),
  name: SortDirectionSchema.optional(),
  note: SortDirectionSchema.optional(),
  startsOn: SortDirectionSchema.optional(),
  updatedAt: SortDirectionSchema.optional(),
});

export const WorkPatternDayNestedPayloadSchema = z.discriminatedUnion('OP', [
  WorkPatternDayNestedCreatePayloadSchema,
  WorkPatternDayNestedUpdatePayloadSchema,
  WorkPatternDayNestedDeletePayloadSchema,
]);

export const WorkPatternCreatePayloadSchema = z.object({
  days: z.array(WorkPatternDayNestedPayloadSchema).optional(),
  endsOn: z.iso.date().nullable().optional(),
  name: z.string(),
  note: z.string().optional(),
  startsOn: z.iso.date(),
});

export const WorkPatternUpdatePayloadSchema = z.object({
  days: z.array(WorkPatternDayNestedPayloadSchema).optional(),
  endsOn: z.iso.date().nullable().optional(),
  name: z.string().optional(),
  note: z.string().optional(),
  startsOn: z.iso.date().optional(),
});

export interface Account {
  address: Address;
  createdAt: string;
  currencyCode: string;
  firstDayOfWeek: AccountFirstDayOfWeek;
  id: string;
  localeCode: string;
  name: null | string;
  ownerId: string;
  updatedAt: string;
}

export interface AccountCreatePayload {
  address?: AddressNestedPayload;
  currencyCode: string;
  firstDayOfWeek?: AccountFirstDayOfWeek;
  localeCode: string;
  name?: null | string;
}

export interface AccountFilter {
  address?: AddressFilter;
  AND?: AccountFilter[];
  createdAt?: DatetimeFilter | string;
  currencyCode?: string | StringFilter;
  firstDayOfWeek?: AccountFirstDayOfWeekFilter;
  id?: string | UuidFilter;
  localeCode?: string | StringFilter;
  name?: NullableStringFilter | string;
  NOT?: AccountFilter;
  OR?: AccountFilter[];
  ownerId?: string | UuidFilter;
  updatedAt?: DatetimeFilter | string;
}

export type AccountFirstDayOfWeek =
  | 'friday'
  | 'monday'
  | 'saturday'
  | 'sunday'
  | 'thursday'
  | 'tuesday'
  | 'wednesday';

export type AccountFirstDayOfWeekFilter =
  | AccountFirstDayOfWeek
  | { eq?: AccountFirstDayOfWeek; in?: AccountFirstDayOfWeek[] };

export interface AccountPage {
  number?: number;
  size?: number;
}

export interface AccountSort {
  address?: AddressSort;
  createdAt?: SortDirection;
  currencyCode?: SortDirection;
  firstDayOfWeek?: SortDirection;
  id?: SortDirection;
  localeCode?: SortDirection;
  name?: SortDirection;
  ownerId?: SortDirection;
  updatedAt?: SortDirection;
}

export interface AccountUpdatePayload {
  address?: AddressNestedPayload;
  currencyCode?: string;
  firstDayOfWeek?: AccountFirstDayOfWeek;
  localeCode?: string;
  name?: null | string;
}

export interface Activity {
  accountId: string;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface ActivityFilter {
  accountId?: string | UuidFilter;
  AND?: ActivityFilter[];
  createdAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: ActivityFilter;
  OR?: ActivityFilter[];
  updatedAt?: DatetimeFilter | string;
}

export interface ActivityPage {
  number?: number;
  size?: number;
}

export interface ActivitySort {
  accountId?: SortDirection;
  createdAt?: SortDirection;
  id?: SortDirection;
  updatedAt?: SortDirection;
}

export interface Address {
  city: string;
  countryCode: string;
  createdAt: string;
  id: string;
  postalCode: string;
  region: string;
  street: string;
  updatedAt: string;
}

export interface AddressFilter {
  AND?: AddressFilter[];
  city?: string | StringFilter;
  countryCode?: string | StringFilter;
  createdAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: AddressFilter;
  OR?: AddressFilter[];
  postalCode?: string | StringFilter;
  region?: string | StringFilter;
  street?: string | StringFilter;
  updatedAt?: DatetimeFilter | string;
}

export interface AddressNestedCreatePayload {
  city?: string;
  countryCode: string;
  OP?: 'create';
  postalCode?: string;
  region?: string;
  street?: string;
}

export interface AddressNestedDeletePayload {
  id: string;
  OP?: 'delete';
}

export type AddressNestedPayload =
  | AddressNestedCreatePayload
  | AddressNestedDeletePayload
  | AddressNestedUpdatePayload;

export interface AddressNestedUpdatePayload {
  city?: string;
  countryCode?: string;
  id?: string;
  OP?: 'update';
  postalCode?: string;
  region?: string;
  street?: string;
}

export interface AddressSort {
  city?: SortDirection;
  countryCode?: SortDirection;
  createdAt?: SortDirection;
  id?: SortDirection;
  postalCode?: SortDirection;
  region?: SortDirection;
  street?: SortDirection;
  updatedAt?: SortDirection;
}

export interface AuditLog {
  accountId: null | string;
  actorId: null | string;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface AuditLogFilter {
  accountId?: NullableUuidFilter | string;
  actorId?: NullableUuidFilter | string;
  AND?: AuditLogFilter[];
  createdAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: AuditLogFilter;
  OR?: AuditLogFilter[];
  updatedAt?: DatetimeFilter | string;
}

export interface AuditLogPage {
  number?: number;
  size?: number;
}

export interface AuditLogSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  createdAt?: SortDirection;
  id?: SortDirection;
  updatedAt?: SortDirection;
}

export interface BillableItem {
  accountId: string;
  actorId: string;
  billableId: string;
  billableType: string;
  billedAt: null | string;
  createdAt: string;
  currencyCode: string;
  description: string;
  id: string;
  quantity: number;
  rateCents: number;
  totalCents: number;
  updatedAt: string;
}

export interface BillableItemCreatePayload {
  billableId: string;
  billableType: string;
  currencyCode?: string;
  description: string;
  quantity?: number;
  rateCents: number;
  totalCents: number;
}

export interface BillableItemFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: BillableItemFilter[];
  billableId?: string | UuidFilter;
  billableType?: string | StringFilter;
  billedAt?: NullableDatetimeFilter | string;
  createdAt?: DatetimeFilter | string;
  currencyCode?: string | StringFilter;
  description?: string | StringFilter;
  id?: string | UuidFilter;
  NOT?: BillableItemFilter;
  OR?: BillableItemFilter[];
  quantity?: DecimalFilter | number;
  rateCents?: IntegerFilter | number;
  totalCents?: IntegerFilter | number;
  updatedAt?: DatetimeFilter | string;
}

export interface BillableItemPage {
  number?: number;
  size?: number;
}

export interface BillableItemSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  billableId?: SortDirection;
  billableType?: SortDirection;
  billedAt?: SortDirection;
  createdAt?: SortDirection;
  currencyCode?: SortDirection;
  description?: SortDirection;
  id?: SortDirection;
  quantity?: SortDirection;
  rateCents?: SortDirection;
  totalCents?: SortDirection;
  updatedAt?: SortDirection;
}

export interface BillableItemUpdatePayload {
  billableId?: string;
  billableType?: string;
  currencyCode?: string;
  description?: string;
  quantity?: number;
  rateCents?: number;
  totalCents?: number;
}

export interface BooleanFilter {
  eq?: boolean;
}

export interface Client {
  accountId: string;
  actorId: string;
  address: Address;
  archivedAt: null | string;
  createdAt: string;
  currencyCode: string;
  email: string;
  kind: ClientKind | null;
  name: null | string;
  note: string;
  phone: string;
  updatedAt: string;
}

export interface ClientCreatePayload {
  address?: AddressNestedPayload;
  currencyCode: string;
  email?: string;
  kind?: ClientKind | null;
  name?: null | string;
  note?: string;
  phone?: string;
}

export interface ClientFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  address?: AddressFilter;
  AND?: ClientFilter[];
  archivedAt?: NullableDatetimeFilter | string;
  createdAt?: DatetimeFilter | string;
  currencyCode?: string | StringFilter;
  email?: string | StringFilter;
  kind?: ClientKindFilter;
  name?: NullableStringFilter | string;
  NOT?: ClientFilter;
  note?: string | StringFilter;
  OR?: ClientFilter[];
  phone?: string | StringFilter;
  updatedAt?: DatetimeFilter | string;
}

export type ClientKind = 'individual' | 'organization';

export type ClientKindFilter =
  | ClientKind
  | { eq?: ClientKind; in?: ClientKind[] };

export interface ClientPage {
  number?: number;
  size?: number;
}

export interface ClientSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  address?: AddressSort;
  archivedAt?: SortDirection;
  createdAt?: SortDirection;
  currencyCode?: SortDirection;
  email?: SortDirection;
  kind?: SortDirection;
  name?: SortDirection;
  note?: SortDirection;
  phone?: SortDirection;
  updatedAt?: SortDirection;
}

export interface ClientUpdatePayload {
  address?: AddressNestedPayload;
  currencyCode?: string;
  email?: string;
  kind?: ClientKind | null;
  name?: null | string;
  note?: string;
  phone?: string;
}

export interface Comment {
  accountId: string;
  actorId: string;
  body: string;
  commentableId: string;
  commentableType: string;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface CommentCreatePayload {
  body: string;
  commentableId: string;
  commentableType: string;
}

export interface CommentFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: CommentFilter[];
  body?: string | StringFilter;
  commentableId?: string | UuidFilter;
  commentableType?: string | StringFilter;
  createdAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: CommentFilter;
  OR?: CommentFilter[];
  updatedAt?: DatetimeFilter | string;
}

export interface CommentPage {
  number?: number;
  size?: number;
}

export interface CommentSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  body?: SortDirection;
  commentableId?: SortDirection;
  commentableType?: SortDirection;
  createdAt?: SortDirection;
  id?: SortDirection;
  updatedAt?: SortDirection;
}

export interface CommentUpdatePayload {
  body?: string;
  commentableId?: string;
  commentableType?: string;
}

export interface Country {
  code: string;
  createdAt: string;
  currencyCodes: unknown;
  id: string;
  updatedAt: string;
}

export interface CountryFilter {
  AND?: CountryFilter[];
  code?: string | StringFilter;
  createdAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: CountryFilter;
  OR?: CountryFilter[];
  updatedAt?: DatetimeFilter | string;
}

export interface CountryPage {
  number?: number;
  size?: number;
}

export interface CountrySort {
  code?: SortDirection;
  createdAt?: SortDirection;
  currencyCodes?: SortDirection;
  id?: SortDirection;
  updatedAt?: SortDirection;
}

export interface Currency {
  code: string;
  createdAt: string;
  id: string;
  symbol: null | string;
  updatedAt: string;
}

export interface CurrencyFilter {
  AND?: CurrencyFilter[];
  code?: string | StringFilter;
  createdAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: CurrencyFilter;
  OR?: CurrencyFilter[];
  symbol?: NullableStringFilter | string;
  updatedAt?: DatetimeFilter | string;
}

export interface CurrencyPage {
  number?: number;
  size?: number;
}

export interface CurrencySort {
  code?: SortDirection;
  createdAt?: SortDirection;
  id?: SortDirection;
  symbol?: SortDirection;
  updatedAt?: SortDirection;
}

export interface DateFilter {
  between?: DateFilterBetween;
  eq?: string;
  gt?: string;
  gte?: string;
  in?: string[];
  lt?: string;
  lte?: string;
}

export interface DateFilterBetween {
  from?: string;
  to?: string;
}

export interface DatetimeFilter {
  between?: DatetimeFilterBetween;
  eq?: string;
  gt?: string;
  gte?: string;
  in?: string[];
  lt?: string;
  lte?: string;
}

export interface DatetimeFilterBetween {
  from?: string;
  to?: string;
}

export interface DecimalFilter {
  between?: DecimalFilterBetween;
  eq?: number;
  gt?: number;
  gte?: number;
  in?: number[];
  lt?: number;
  lte?: number;
}

export interface DecimalFilterBetween {
  from?: number;
  to?: number;
}

export interface Employee {
  accountId: string;
  actorId: string;
  birthOn: null | string;
  email: null | string;
  firstName: null | string;
  fullName: unknown;
  lastName: null | string;
  note: null | string;
  phone: null | string;
  userId: null | string;
}

export interface EmployeeCreatePayload {
  birthOn?: null | string;
  email?: null | string;
  firstName?: null | string;
  lastName?: null | string;
  note?: null | string;
  phone?: null | string;
}

export interface EmployeeFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: EmployeeFilter[];
  birthOn?: NullableDateFilter | string;
  email?: NullableStringFilter | string;
  firstName?: NullableStringFilter | string;
  lastName?: NullableStringFilter | string;
  NOT?: EmployeeFilter;
  note?: NullableStringFilter | string;
  OR?: EmployeeFilter[];
  phone?: NullableStringFilter | string;
  userId?: NullableUuidFilter | string;
}

export interface EmployeePage {
  number?: number;
  size?: number;
}

export interface EmployeeSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  birthOn?: SortDirection;
  email?: SortDirection;
  firstName?: SortDirection;
  lastName?: SortDirection;
  note?: SortDirection;
  phone?: SortDirection;
  userId?: SortDirection;
}

export interface EmployeeUpdatePayload {
  birthOn?: null | string;
  email?: null | string;
  firstName?: null | string;
  lastName?: null | string;
  note?: null | string;
  phone?: null | string;
}

export interface Error {
  issues: Issue[];
  layer: Layer;
}

export type ErrorResponseBody = Error;

export interface Event {
  accountId: string;
  actorId: string;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface EventFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: EventFilter[];
  createdAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: EventFilter;
  OR?: EventFilter[];
  updatedAt?: DatetimeFilter | string;
}

export interface EventPage {
  number?: number;
  size?: number;
}

export interface EventSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  createdAt?: SortDirection;
  id?: SortDirection;
  updatedAt?: SortDirection;
}

export interface IntegerFilter {
  between?: IntegerFilterBetween;
  eq?: number;
  gt?: number;
  gte?: number;
  in?: number[];
  lt?: number;
  lte?: number;
}

export interface IntegerFilterBetween {
  from?: number;
  to?: number;
}

export interface Invite {
  acceptedAt: null | string;
  accountId: string;
  actorId: string;
  createdAt: string;
  email: string;
  employeeId: null | string;
  id: string;
  role: string;
  token: string;
  updatedAt: string;
}

export interface InviteUpdatePayload {
  email?: string;
  employeeId?: null | string;
  role?: string;
}

export interface Issue {
  code: string;
  detail: string;
  meta: Record<string, unknown>;
  path: string[];
  pointer: string;
}

export type Layer = 'contract' | 'domain' | 'http';

export interface LeaveRequest {
  accountId: string;
  actorId: string;
  approvedAt: null | string;
  createdAt: string;
  employeeId: string;
  endsAt: string;
  id: string;
  kind: LeaveRequestKind;
  note: null | string;
  rejectedAt: null | string;
  startsAt: string;
  updatedAt: string;
}

export interface LeaveRequestCreatePayload {
  employeeId: string;
  endsAt: string;
  kind?: LeaveRequestKind;
  note?: null | string;
  startsAt: string;
}

export interface LeaveRequestFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: LeaveRequestFilter[];
  approvedAt?: NullableDatetimeFilter | string;
  createdAt?: DatetimeFilter | string;
  employeeId?: string | UuidFilter;
  endsAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  kind?: LeaveRequestKindFilter;
  NOT?: LeaveRequestFilter;
  note?: NullableStringFilter | string;
  OR?: LeaveRequestFilter[];
  rejectedAt?: NullableDatetimeFilter | string;
  startsAt?: DatetimeFilter | string;
  updatedAt?: DatetimeFilter | string;
}

export type LeaveRequestKind = 'childcare' | 'other' | 'sick' | 'vacation';

export type LeaveRequestKindFilter =
  | LeaveRequestKind
  | { eq?: LeaveRequestKind; in?: LeaveRequestKind[] };

export interface LeaveRequestPage {
  number?: number;
  size?: number;
}

export interface LeaveRequestSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  approvedAt?: SortDirection;
  createdAt?: SortDirection;
  employeeId?: SortDirection;
  endsAt?: SortDirection;
  id?: SortDirection;
  kind?: SortDirection;
  note?: SortDirection;
  rejectedAt?: SortDirection;
  startsAt?: SortDirection;
  updatedAt?: SortDirection;
}

export interface LeaveRequestUpdatePayload {
  employeeId?: string;
  endsAt?: string;
  kind?: LeaveRequestKind;
  note?: null | string;
  startsAt?: string;
}

export interface Locale {
  code: string;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface LocaleFilter {
  AND?: LocaleFilter[];
  code?: string | StringFilter;
  createdAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: LocaleFilter;
  OR?: LocaleFilter[];
  updatedAt?: DatetimeFilter | string;
}

export interface LocalePage {
  number?: number;
  size?: number;
}

export interface LocaleSort {
  code?: SortDirection;
  createdAt?: SortDirection;
  id?: SortDirection;
  updatedAt?: SortDirection;
}

export interface NullableDateFilter {
  between?: DateFilterBetween;
  eq?: string;
  gt?: string;
  gte?: string;
  in?: string[];
  lt?: string;
  lte?: string;
  null?: boolean;
}

export interface NullableDatetimeFilter {
  between?: DatetimeFilterBetween;
  eq?: string;
  gt?: string;
  gte?: string;
  in?: string[];
  lt?: string;
  lte?: string;
  null?: boolean;
}

export interface NullableIntegerFilter {
  between?: IntegerFilterBetween;
  eq?: number;
  gt?: number;
  gte?: number;
  in?: number[];
  lt?: number;
  lte?: number;
  null?: boolean;
}

export interface NullableStringFilter {
  contains?: string;
  endsWith?: string;
  eq?: string;
  in?: string[];
  null?: boolean;
  startsWith?: string;
}

export interface NullableUuidFilter {
  eq?: string;
  in?: string[];
  null?: boolean;
}

export interface OffsetPagination {
  current: number;
  items: number;
  next?: null | number;
  prev?: null | number;
  total: number;
}

export interface Rate {
  accountId: string;
  actorId: string;
  createdAt: string;
  currencyCode: string;
  effectiveFrom: string;
  effectiveUntil: null | string;
  hourlyRateCents: number;
  id: string;
  rateableId: string;
  rateableType: string;
  updatedAt: string;
}

export interface RateCreatePayload {
  currencyCode?: string;
  effectiveFrom: string;
  effectiveUntil?: null | string;
  hourlyRateCents: number;
  rateableId: string;
  rateableType: string;
}

export interface RateFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: RateFilter[];
  createdAt?: DatetimeFilter | string;
  currencyCode?: string | StringFilter;
  effectiveFrom?: DateFilter | string;
  effectiveUntil?: NullableDateFilter | string;
  hourlyRateCents?: IntegerFilter | number;
  id?: string | UuidFilter;
  NOT?: RateFilter;
  OR?: RateFilter[];
  rateableId?: string | UuidFilter;
  rateableType?: string | StringFilter;
  updatedAt?: DatetimeFilter | string;
}

export interface RatePage {
  number?: number;
  size?: number;
}

export interface RateSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  createdAt?: SortDirection;
  currencyCode?: SortDirection;
  effectiveFrom?: SortDirection;
  effectiveUntil?: SortDirection;
  hourlyRateCents?: SortDirection;
  id?: SortDirection;
  rateableId?: SortDirection;
  rateableType?: SortDirection;
  updatedAt?: SortDirection;
}

export interface RateUpdatePayload {
  currencyCode?: string;
  effectiveFrom?: string;
  effectiveUntil?: null | string;
  hourlyRateCents?: number;
  rateableId?: string;
  rateableType?: string;
}

export interface Schedule {
  accountId: string;
  actorId: string;
  archivedAt: null | string;
  createdAt: string;
  endsOn: string;
  id: string;
  name: string;
  publishedAt: null | string;
  startsOn: string;
  status: unknown;
  teamId: null | string;
  updatedAt: string;
}

export interface ScheduleCreatePayload {
  endsOn: string;
  name: string;
  startsOn: string;
  teamId?: null | string;
}

export interface ScheduleFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: ScheduleFilter[];
  archivedAt?: NullableDatetimeFilter | string;
  createdAt?: DatetimeFilter | string;
  endsOn?: DateFilter | string;
  id?: string | UuidFilter;
  name?: string | StringFilter;
  NOT?: ScheduleFilter;
  OR?: ScheduleFilter[];
  publishedAt?: NullableDatetimeFilter | string;
  startsOn?: DateFilter | string;
  teamId?: NullableUuidFilter | string;
  updatedAt?: DatetimeFilter | string;
}

export interface SchedulePage {
  number?: number;
  size?: number;
}

export interface ScheduleSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  archivedAt?: SortDirection;
  createdAt?: SortDirection;
  endsOn?: SortDirection;
  id?: SortDirection;
  name?: SortDirection;
  publishedAt?: SortDirection;
  startsOn?: SortDirection;
  status?: SortDirection;
  teamId?: SortDirection;
  updatedAt?: SortDirection;
}

export interface ScheduleUpdatePayload {
  endsOn?: string;
  name?: string;
  startsOn?: string;
  teamId?: null | string;
}

export interface Service {
  accountId: string;
  actorId: string;
  archivedAt: null | string;
  color: ServiceColor;
  createdAt: string;
  defaultDurationMinutes: null | number;
  description: null | string;
  icon: ServiceIcon;
  id: string;
  internal: boolean;
  name: string;
  updatedAt: string;
}

export type ServiceColor =
  | 'black'
  | 'blue'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'orange'
  | 'pink'
  | 'red'
  | 'teal'
  | 'violet'
  | 'white'
  | 'yellow';

export type ServiceColorFilter =
  | ServiceColor
  | { eq?: ServiceColor; in?: ServiceColor[] };

export interface ServiceCreatePayload {
  color: ServiceColor;
  defaultDurationMinutes?: null | number;
  description?: null | string;
  icon: ServiceIcon;
  internal: boolean;
  name: string;
}

export interface ServiceFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: ServiceFilter[];
  archivedAt?: NullableDatetimeFilter | string;
  color?: ServiceColorFilter;
  createdAt?: DatetimeFilter | string;
  defaultDurationMinutes?: NullableIntegerFilter | number;
  description?: NullableStringFilter | string;
  icon?: ServiceIconFilter;
  id?: string | UuidFilter;
  internal?: boolean | BooleanFilter;
  name?: string | StringFilter;
  NOT?: ServiceFilter;
  OR?: ServiceFilter[];
  updatedAt?: DatetimeFilter | string;
}

export type ServiceIcon =
  | 'bolt'
  | 'broom'
  | 'calendar'
  | 'check'
  | 'clock'
  | 'cross'
  | 'star'
  | 'truck'
  | 'user';

export type ServiceIconFilter =
  | ServiceIcon
  | { eq?: ServiceIcon; in?: ServiceIcon[] };

export interface ServicePage {
  number?: number;
  size?: number;
}

export interface ServiceSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  archivedAt?: SortDirection;
  color?: SortDirection;
  createdAt?: SortDirection;
  defaultDurationMinutes?: SortDirection;
  description?: SortDirection;
  icon?: SortDirection;
  id?: SortDirection;
  internal?: SortDirection;
  name?: SortDirection;
  updatedAt?: SortDirection;
}

export interface ServiceUpdatePayload {
  color?: ServiceColor;
  defaultDurationMinutes?: null | number;
  description?: null | string;
  icon?: ServiceIcon;
  internal?: boolean;
  name?: string;
}

export interface Session {
  createdAt: string;
  expiresAt: string;
  id: string;
  updatedAt: string;
  userId: string;
}

export interface SessionFilter {
  AND?: SessionFilter[];
  createdAt?: DatetimeFilter | string;
  expiresAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: SessionFilter;
  OR?: SessionFilter[];
  updatedAt?: DatetimeFilter | string;
  userId?: string | UuidFilter;
}

export interface SessionPage {
  number?: number;
  size?: number;
}

export interface SessionSort {
  createdAt?: SortDirection;
  expiresAt?: SortDirection;
  id?: SortDirection;
  updatedAt?: SortDirection;
  userId?: SortDirection;
}

export interface Shift {
  accountId: string;
  actorId: string;
  createdAt: string;
  endsAt: null | string;
  id: string;
  note: string;
  scheduleId: null | string;
  serviceId: string;
  siteId: string;
  startsAt: null | string;
  updatedAt: string;
}

export interface ShiftCreatePayload {
  endsAt?: null | string;
  note?: string;
  serviceId: string;
  siteId: string;
  startsAt?: null | string;
}

export interface ShiftFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: ShiftFilter[];
  createdAt?: DatetimeFilter | string;
  endsAt?: NullableDatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: ShiftFilter;
  note?: string | StringFilter;
  OR?: ShiftFilter[];
  scheduleId?: NullableUuidFilter | string;
  serviceId?: string | UuidFilter;
  siteId?: string | UuidFilter;
  startsAt?: NullableDatetimeFilter | string;
  updatedAt?: DatetimeFilter | string;
}

export interface ShiftPage {
  number?: number;
  size?: number;
}

export interface ShiftSeries {
  accountId: string;
  actorId: string;
  createdAt: string;
  durationMinutes: number;
  id: string;
  siteId: null | string;
  startTime: string;
  updatedAt: string;
}

export interface ShiftSeriesCreatePayload {
  durationMinutes: number;
  siteId?: null | string;
  startTime: string;
}

export interface ShiftSeriesFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: ShiftSeriesFilter[];
  createdAt?: DatetimeFilter | string;
  durationMinutes?: IntegerFilter | number;
  id?: string | UuidFilter;
  NOT?: ShiftSeriesFilter;
  OR?: ShiftSeriesFilter[];
  siteId?: NullableUuidFilter | string;
  startTime?: string | StringFilter;
  updatedAt?: DatetimeFilter | string;
}

export interface ShiftSeriesPage {
  number?: number;
  size?: number;
}

export interface ShiftSeriesSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  createdAt?: SortDirection;
  durationMinutes?: SortDirection;
  id?: SortDirection;
  siteId?: SortDirection;
  startTime?: SortDirection;
  updatedAt?: SortDirection;
}

export interface ShiftSeriesUpdatePayload {
  durationMinutes?: number;
  siteId?: null | string;
  startTime?: string;
}

export interface ShiftSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  createdAt?: SortDirection;
  endsAt?: SortDirection;
  id?: SortDirection;
  note?: SortDirection;
  scheduleId?: SortDirection;
  serviceId?: SortDirection;
  siteId?: SortDirection;
  startsAt?: SortDirection;
  updatedAt?: SortDirection;
}

export interface ShiftSwapRequest {
  accountId: string;
  actorId: string;
  approvedAt: null | string;
  cancelledAt: null | string;
  createdAt: string;
  id: string;
  note: null | string;
  proposedEmployeeId: string;
  rejectedAt: null | string;
  requestedByEmployeeId: string;
  shiftId: string;
  updatedAt: string;
}

export interface ShiftSwapRequestCreatePayload {
  note?: null | string;
  proposedEmployeeId: string;
  requestedByEmployeeId: string;
  shiftId: string;
}

export interface ShiftSwapRequestFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: ShiftSwapRequestFilter[];
  approvedAt?: NullableDatetimeFilter | string;
  cancelledAt?: NullableDatetimeFilter | string;
  createdAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  NOT?: ShiftSwapRequestFilter;
  note?: NullableStringFilter | string;
  OR?: ShiftSwapRequestFilter[];
  proposedEmployeeId?: string | UuidFilter;
  rejectedAt?: NullableDatetimeFilter | string;
  requestedByEmployeeId?: string | UuidFilter;
  shiftId?: string | UuidFilter;
  updatedAt?: DatetimeFilter | string;
}

export interface ShiftSwapRequestPage {
  number?: number;
  size?: number;
}

export interface ShiftSwapRequestSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  approvedAt?: SortDirection;
  cancelledAt?: SortDirection;
  createdAt?: SortDirection;
  id?: SortDirection;
  note?: SortDirection;
  proposedEmployeeId?: SortDirection;
  rejectedAt?: SortDirection;
  requestedByEmployeeId?: SortDirection;
  shiftId?: SortDirection;
  updatedAt?: SortDirection;
}

export interface ShiftSwapRequestUpdatePayload {
  note?: null | string;
  proposedEmployeeId?: string;
  requestedByEmployeeId?: string;
  shiftId?: string;
}

export interface ShiftUpdatePayload {
  endsAt?: null | string;
  note?: string;
  serviceId?: string;
  siteId?: string;
  startsAt?: null | string;
}

export interface Site {
  accountId: string;
  actorId: string;
  address: Address;
  clientId: string;
  createdAt: string;
  currencyCode: string;
  id: string;
  name: string;
  note: string;
  updatedAt: string;
}

export interface SiteCreatePayload {
  address?: AddressNestedPayload;
  clientId: string;
  name: string;
  note?: string;
}

export interface SiteFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  address?: AddressFilter;
  AND?: SiteFilter[];
  clientId?: string | UuidFilter;
  createdAt?: DatetimeFilter | string;
  currencyCode?: string | StringFilter;
  id?: string | UuidFilter;
  name?: string | StringFilter;
  NOT?: SiteFilter;
  note?: string | StringFilter;
  OR?: SiteFilter[];
  updatedAt?: DatetimeFilter | string;
}

export interface SitePage {
  number?: number;
  size?: number;
}

export interface SiteSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  address?: AddressSort;
  clientId?: SortDirection;
  createdAt?: SortDirection;
  currencyCode?: SortDirection;
  id?: SortDirection;
  name?: SortDirection;
  note?: SortDirection;
  updatedAt?: SortDirection;
}

export interface SiteUpdatePayload {
  address?: AddressNestedPayload;
  clientId?: string;
  name?: string;
  note?: string;
}

export type SortDirection = 'asc' | 'desc';

export interface StringFilter {
  contains?: string;
  endsWith?: string;
  eq?: string;
  in?: string[];
  startsWith?: string;
}

export interface Team {
  accountId: string;
  actorId: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
}

export interface TeamCreatePayload {
  description?: string;
  name: string;
}

export interface TeamFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: TeamFilter[];
  createdAt?: DatetimeFilter | string;
  description?: string | StringFilter;
  id?: string | UuidFilter;
  name?: string | StringFilter;
  NOT?: TeamFilter;
  OR?: TeamFilter[];
  updatedAt?: DatetimeFilter | string;
}

export interface TeamPage {
  number?: number;
  size?: number;
}

export interface TeamSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  createdAt?: SortDirection;
  description?: SortDirection;
  id?: SortDirection;
  name?: SortDirection;
  updatedAt?: SortDirection;
}

export interface TeamUpdatePayload {
  description?: string;
  name?: string;
}

export interface TimeEntry {
  accountId: string;
  actorId: string;
  approvedAt: null | string;
  createdAt: string;
  durationSeconds: null | number;
  employeeId: string;
  id: string;
  lockedAt: null | string;
  note: string;
  shiftId: null | string;
  siteId: string;
  source: TimeEntrySource;
  startedAt: string;
  status: string;
  stoppedAt: null | string;
  updatedAt: string;
}

export interface TimeEntryCreatePayload {
  employeeId: string;
  note?: string;
  shiftId?: null | string;
  siteId: string;
  source?: TimeEntrySource;
  startedAt: string;
}

export interface TimeEntryFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: TimeEntryFilter[];
  approvedAt?: NullableDatetimeFilter | string;
  createdAt?: DatetimeFilter | string;
  durationSeconds?: NullableIntegerFilter | number;
  employeeId?: string | UuidFilter;
  id?: string | UuidFilter;
  lockedAt?: NullableDatetimeFilter | string;
  NOT?: TimeEntryFilter;
  note?: string | StringFilter;
  OR?: TimeEntryFilter[];
  shiftId?: NullableUuidFilter | string;
  siteId?: string | UuidFilter;
  source?: TimeEntrySourceFilter;
  startedAt?: DatetimeFilter | string;
  status?: string | StringFilter;
  stoppedAt?: NullableDatetimeFilter | string;
  updatedAt?: DatetimeFilter | string;
}

export interface TimeEntryPage {
  number?: number;
  size?: number;
}

export interface TimeEntrySort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  approvedAt?: SortDirection;
  createdAt?: SortDirection;
  durationSeconds?: SortDirection;
  employeeId?: SortDirection;
  id?: SortDirection;
  lockedAt?: SortDirection;
  note?: SortDirection;
  shiftId?: SortDirection;
  siteId?: SortDirection;
  source?: SortDirection;
  startedAt?: SortDirection;
  status?: SortDirection;
  stoppedAt?: SortDirection;
  updatedAt?: SortDirection;
}

export type TimeEntrySource = 'kiosk' | 'manual' | 'mobile';

export type TimeEntrySourceFilter =
  | TimeEntrySource
  | { eq?: TimeEntrySource; in?: TimeEntrySource[] };

export interface TimeEntryUpdatePayload {
  employeeId?: string;
  note?: string;
  shiftId?: null | string;
  siteId?: string;
  source?: TimeEntrySource;
  startedAt?: string;
}

export interface User {
  createdAt: string;
  email: null | string;
  firstName: null | string;
  fullName: unknown;
  id: string;
  lastName: string;
  localeCode: null | string;
  notificationSettings: unknown;
  notificationSettingsHash: unknown;
  phone: null | string;
  updatedAt: string;
}

export interface UserUpdatePayload {
  email?: null | string;
  firstName?: null | string;
  lastName?: string;
  localeCode?: null | string;
  notificationSettingsHash?: unknown;
  phone?: null | string;
}

export interface UuidFilter {
  eq?: string;
  in?: string[];
}

export interface WorkPattern {
  accountId: string;
  actorId: string;
  createdAt: string;
  days: WorkPatternDay[];
  endsOn: null | string;
  id: string;
  name: string;
  note: string;
  startsOn: string;
  updatedAt: string;
}

export interface WorkPatternCreatePayload {
  days?: WorkPatternDayNestedPayload[];
  endsOn?: null | string;
  name: string;
  note?: string;
  startsOn: string;
}

export interface WorkPatternDay {
  createdAt: string;
  day: WorkPatternDayDay;
  enabled: boolean;
  id: string;
  intervals: WorkPatternDayInterval[];
  updatedAt: string;
  workPatternId: string;
}

export type WorkPatternDayDay =
  | 'friday'
  | 'monday'
  | 'saturday'
  | 'sunday'
  | 'thursday'
  | 'tuesday'
  | 'wednesday';

export type WorkPatternDayDayFilter =
  | WorkPatternDayDay
  | { eq?: WorkPatternDayDay; in?: WorkPatternDayDay[] };

export interface WorkPatternDayFilter {
  AND?: WorkPatternDayFilter[];
  createdAt?: DatetimeFilter | string;
  day?: WorkPatternDayDayFilter;
  enabled?: boolean | BooleanFilter;
  id?: string | UuidFilter;
  intervals?: WorkPatternDayIntervalFilter;
  NOT?: WorkPatternDayFilter;
  OR?: WorkPatternDayFilter[];
  updatedAt?: DatetimeFilter | string;
  workPatternId?: string | UuidFilter;
}

export interface WorkPatternDayInterval {
  createdAt: string;
  endTime: string;
  id: string;
  startTime: string;
  updatedAt: string;
  workPatternDayId: string;
}

export interface WorkPatternDayIntervalFilter {
  AND?: WorkPatternDayIntervalFilter[];
  createdAt?: DatetimeFilter | string;
  endTime?: string | StringFilter;
  id?: string | UuidFilter;
  NOT?: WorkPatternDayIntervalFilter;
  OR?: WorkPatternDayIntervalFilter[];
  startTime?: string | StringFilter;
  updatedAt?: DatetimeFilter | string;
  workPatternDayId?: string | UuidFilter;
}

export interface WorkPatternDayIntervalNestedCreatePayload {
  endTime: string;
  OP?: 'create';
  startTime: string;
  workPatternDayId: string;
}

export interface WorkPatternDayIntervalNestedDeletePayload {
  id: string;
  OP?: 'delete';
}

export type WorkPatternDayIntervalNestedPayload =
  | WorkPatternDayIntervalNestedCreatePayload
  | WorkPatternDayIntervalNestedDeletePayload
  | WorkPatternDayIntervalNestedUpdatePayload;

export interface WorkPatternDayIntervalNestedUpdatePayload {
  endTime?: string;
  id?: string;
  OP?: 'update';
  startTime?: string;
  workPatternDayId?: string;
}

export interface WorkPatternDayIntervalSort {
  createdAt?: SortDirection;
  endTime?: SortDirection;
  id?: SortDirection;
  startTime?: SortDirection;
  updatedAt?: SortDirection;
  workPatternDayId?: SortDirection;
}

export interface WorkPatternDayNestedCreatePayload {
  day: WorkPatternDayDay;
  enabled?: boolean;
  intervals?: WorkPatternDayIntervalNestedPayload[];
  OP?: 'create';
  workPatternId: string;
}

export interface WorkPatternDayNestedDeletePayload {
  id: string;
  OP?: 'delete';
}

export type WorkPatternDayNestedPayload =
  | WorkPatternDayNestedCreatePayload
  | WorkPatternDayNestedDeletePayload
  | WorkPatternDayNestedUpdatePayload;

export interface WorkPatternDayNestedUpdatePayload {
  day?: WorkPatternDayDay;
  enabled?: boolean;
  id?: string;
  intervals?: WorkPatternDayIntervalNestedPayload[];
  OP?: 'update';
  workPatternId?: string;
}

export interface WorkPatternDaySort {
  createdAt?: SortDirection;
  day?: SortDirection;
  enabled?: SortDirection;
  id?: SortDirection;
  intervals?: WorkPatternDayIntervalSort;
  updatedAt?: SortDirection;
  workPatternId?: SortDirection;
}

export interface WorkPatternFilter {
  accountId?: string | UuidFilter;
  actorId?: string | UuidFilter;
  AND?: WorkPatternFilter[];
  createdAt?: DatetimeFilter | string;
  days?: WorkPatternDayFilter;
  endsOn?: NullableDateFilter | string;
  id?: string | UuidFilter;
  name?: string | StringFilter;
  NOT?: WorkPatternFilter;
  note?: string | StringFilter;
  OR?: WorkPatternFilter[];
  startsOn?: DateFilter | string;
  updatedAt?: DatetimeFilter | string;
}

export interface WorkPatternPage {
  number?: number;
  size?: number;
}

export interface WorkPatternSort {
  accountId?: SortDirection;
  actorId?: SortDirection;
  createdAt?: SortDirection;
  days?: WorkPatternDaySort;
  endsOn?: SortDirection;
  id?: SortDirection;
  name?: SortDirection;
  note?: SortDirection;
  startsOn?: SortDirection;
  updatedAt?: SortDirection;
}

export interface WorkPatternTemplate {
  code: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
}

export interface WorkPatternTemplateFilter {
  AND?: WorkPatternTemplateFilter[];
  code?: string | StringFilter;
  createdAt?: DatetimeFilter | string;
  id?: string | UuidFilter;
  name?: string | StringFilter;
  NOT?: WorkPatternTemplateFilter;
  OR?: WorkPatternTemplateFilter[];
  updatedAt?: DatetimeFilter | string;
}

export interface WorkPatternTemplatePage {
  number?: number;
  size?: number;
}

export interface WorkPatternTemplateSort {
  code?: SortDirection;
  createdAt?: SortDirection;
  id?: SortDirection;
  name?: SortDirection;
  updatedAt?: SortDirection;
}

export interface WorkPatternUpdatePayload {
  days?: WorkPatternDayNestedPayload[];
  endsOn?: null | string;
  name?: string;
  note?: string;
  startsOn?: string;
}

export const contract = {
  endpoints: {
    accounts: {
      activities: {
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/activities',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([ActivityFilterSchema, z.array(ActivityFilterSchema)])
                .optional(),
              page: ActivityPageSchema.optional(),
              sort: z
                .union([ActivitySortSchema, z.array(ActivitySortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              activities: z.array(ActivitySchema),
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/activities/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              activity: ActivitySchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
      },
      auditLogs: {
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/auditLogs',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([AuditLogFilterSchema, z.array(AuditLogFilterSchema)])
                .optional(),
              page: AuditLogPageSchema.optional(),
              sort: z
                .union([AuditLogSortSchema, z.array(AuditLogSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              auditLogs: z.array(AuditLogSchema),
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/auditLogs/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              auditLog: AuditLogSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
      },
      billableItems: {
        bill: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/billableItems/:id/bill',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              billableItem: BillableItemSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/billableItems',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ billableItem: BillableItemCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              billableItem: BillableItemSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/billableItems/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/billableItems',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([
                  BillableItemFilterSchema,
                  z.array(BillableItemFilterSchema),
                ])
                .optional(),
              page: BillableItemPageSchema.optional(),
              sort: z
                .union([
                  BillableItemSortSchema,
                  z.array(BillableItemSortSchema),
                ])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              billableItems: z.array(BillableItemSchema),
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/billableItems/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              billableItem: BillableItemSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        unbill: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/billableItems/:id/unbill',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              billableItem: BillableItemSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/billableItems/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ billableItem: BillableItemUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              billableItem: BillableItemSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
      },
      clients: {
        archive: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/clients/:id/archive',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              client: ClientSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/clients',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ client: ClientCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              client: ClientSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/clients/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/clients',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([ClientFilterSchema, z.array(ClientFilterSchema)])
                .optional(),
              page: ClientPageSchema.optional(),
              sort: z
                .union([ClientSortSchema, z.array(ClientSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              clients: z.array(ClientSchema),
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/clients/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              client: ClientSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        unarchive: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/clients/:id/unarchive',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              client: ClientSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/clients/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ client: ClientUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              client: ClientSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
      },
      comments: {
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/comments',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ comment: CommentCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              comment: CommentSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/comments/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/comments',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([CommentFilterSchema, z.array(CommentFilterSchema)])
                .optional(),
              page: CommentPageSchema.optional(),
              sort: z
                .union([CommentSortSchema, z.array(CommentSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              comments: z.array(CommentSchema),
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/comments/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              comment: CommentSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/comments/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ comment: CommentUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              comment: CommentSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
      },
      create: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'POST',
        path: '/accounts',
        request: {
          body: z.object({ account: AccountCreatePayloadSchema }),
        },
        response: {
          body: z.object({
            account: AccountSchema,
            meta: z.record(z.string(), z.unknown()).optional(),
          }),
        },
      },
      destroy: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'DELETE',
        path: '/accounts/:id',
        pathParams: z.object({ id: z.string() }),
        response: {
          body: z.unknown(),
        },
      },
      employees: {
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/employees',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ employee: EmployeeCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              employee: EmployeeSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/employees/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/employees',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([EmployeeFilterSchema, z.array(EmployeeFilterSchema)])
                .optional(),
              page: EmployeePageSchema.optional(),
              sort: z
                .union([EmployeeSortSchema, z.array(EmployeeSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              employees: z.array(EmployeeSchema),
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/employees/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              employee: EmployeeSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/employees/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ employee: EmployeeUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              employee: EmployeeSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
      },
      events: {
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/events',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([EventFilterSchema, z.array(EventFilterSchema)])
                .optional(),
              page: EventPageSchema.optional(),
              sort: z
                .union([EventSortSchema, z.array(EventSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              events: z.array(EventSchema),
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/events/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              event: EventSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
      },
      index: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/accounts',
        request: {
          query: z.object({
            filter: z
              .union([AccountFilterSchema, z.array(AccountFilterSchema)])
              .optional(),
            page: AccountPageSchema.optional(),
            sort: z
              .union([AccountSortSchema, z.array(AccountSortSchema)])
              .optional(),
          }),
        },
        response: {
          body: z.object({
            accounts: z.array(AccountSchema),
            meta: z.record(z.string(), z.unknown()).optional(),
            pagination: OffsetPaginationSchema,
          }),
        },
      },
      leaveRequests: {
        approve: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/leaveRequests/:id/approve',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              leaveRequest: LeaveRequestSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/leaveRequests',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ leaveRequest: LeaveRequestCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              leaveRequest: LeaveRequestSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/leaveRequests/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/leaveRequests',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([
                  LeaveRequestFilterSchema,
                  z.array(LeaveRequestFilterSchema),
                ])
                .optional(),
              page: LeaveRequestPageSchema.optional(),
              sort: z
                .union([
                  LeaveRequestSortSchema,
                  z.array(LeaveRequestSortSchema),
                ])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              leaveRequests: z.array(LeaveRequestSchema),
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
            }),
          },
        },
        reject: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/leaveRequests/:id/reject',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              leaveRequest: LeaveRequestSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/leaveRequests/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              leaveRequest: LeaveRequestSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        unapprove: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/leaveRequests/:id/unapprove',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              leaveRequest: LeaveRequestSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        unreject: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/leaveRequests/:id/unreject',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              leaveRequest: LeaveRequestSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/leaveRequests/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ leaveRequest: LeaveRequestUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              leaveRequest: LeaveRequestSchema,
              meta: z.record(z.string(), z.unknown()).optional(),
            }),
          },
        },
      },
      rates: {
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/rates',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ rate: RateCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              rate: RateSchema,
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/rates/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/rates',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([RateFilterSchema, z.array(RateFilterSchema)])
                .optional(),
              page: RatePageSchema.optional(),
              sort: z
                .union([RateSortSchema, z.array(RateSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              rates: z.array(RateSchema),
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/rates/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              rate: RateSchema,
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/rates/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ rate: RateUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              rate: RateSchema,
            }),
          },
        },
      },
      schedules: {
        archive: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/schedules/:id/archive',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              schedule: ScheduleSchema,
            }),
          },
        },
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/schedules',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ schedule: ScheduleCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              schedule: ScheduleSchema,
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/schedules/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/schedules',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([ScheduleFilterSchema, z.array(ScheduleFilterSchema)])
                .optional(),
              page: SchedulePageSchema.optional(),
              sort: z
                .union([ScheduleSortSchema, z.array(ScheduleSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              schedules: z.array(ScheduleSchema),
            }),
          },
        },
        publish: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/schedules/:id/publish',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              schedule: ScheduleSchema,
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/schedules/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              schedule: ScheduleSchema,
            }),
          },
        },
        unarchive: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/schedules/:id/unarchive',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              schedule: ScheduleSchema,
            }),
          },
        },
        unpublish: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/schedules/:id/unpublish',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              schedule: ScheduleSchema,
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/schedules/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ schedule: ScheduleUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              schedule: ScheduleSchema,
            }),
          },
        },
      },
      services: {
        archive: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/services/:id/archive',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              service: ServiceSchema,
            }),
          },
        },
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/services',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ service: ServiceCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              service: ServiceSchema,
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/services/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/services',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([ServiceFilterSchema, z.array(ServiceFilterSchema)])
                .optional(),
              page: ServicePageSchema.optional(),
              sort: z
                .union([ServiceSortSchema, z.array(ServiceSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              services: z.array(ServiceSchema),
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/services/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              service: ServiceSchema,
            }),
          },
        },
        unarchive: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/services/:id/unarchive',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              service: ServiceSchema,
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/services/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ service: ServiceUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              service: ServiceSchema,
            }),
          },
        },
      },
      shifts: {
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/shifts',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ shift: ShiftCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shift: ShiftSchema,
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/shifts/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/shifts',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([ShiftFilterSchema, z.array(ShiftFilterSchema)])
                .optional(),
              page: ShiftPageSchema.optional(),
              sort: z
                .union([ShiftSortSchema, z.array(ShiftSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              shifts: z.array(ShiftSchema),
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/shifts/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shift: ShiftSchema,
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/shifts/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ shift: ShiftUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shift: ShiftSchema,
            }),
          },
        },
      },
      shiftSeries: {
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/shiftSeries',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ shiftSeries: ShiftSeriesCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSeries: ShiftSeriesSchema,
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/shiftSeries/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/shiftSeries',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([
                  ShiftSeriesFilterSchema,
                  z.array(ShiftSeriesFilterSchema),
                ])
                .optional(),
              page: ShiftSeriesPageSchema.optional(),
              sort: z
                .union([ShiftSeriesSortSchema, z.array(ShiftSeriesSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              shiftSeries: z.array(ShiftSeriesSchema),
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/shiftSeries/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSeries: ShiftSeriesSchema,
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/shiftSeries/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ shiftSeries: ShiftSeriesUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSeries: ShiftSeriesSchema,
            }),
          },
        },
      },
      shiftSwapRequests: {
        approve: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/shiftSwapRequests/:id/approve',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSwapRequest: ShiftSwapRequestSchema,
            }),
          },
        },
        cancel: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/shiftSwapRequests/:id/cancel',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSwapRequest: ShiftSwapRequestSchema,
            }),
          },
        },
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/shiftSwapRequests',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({
              shiftSwapRequest: ShiftSwapRequestCreatePayloadSchema,
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSwapRequest: ShiftSwapRequestSchema,
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/shiftSwapRequests/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/shiftSwapRequests',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([
                  ShiftSwapRequestFilterSchema,
                  z.array(ShiftSwapRequestFilterSchema),
                ])
                .optional(),
              page: ShiftSwapRequestPageSchema.optional(),
              sort: z
                .union([
                  ShiftSwapRequestSortSchema,
                  z.array(ShiftSwapRequestSortSchema),
                ])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              shiftSwapRequests: z.array(ShiftSwapRequestSchema),
            }),
          },
        },
        reject: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/shiftSwapRequests/:id/reject',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSwapRequest: ShiftSwapRequestSchema,
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/shiftSwapRequests/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSwapRequest: ShiftSwapRequestSchema,
            }),
          },
        },
        unapprove: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/shiftSwapRequests/:id/unapprove',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSwapRequest: ShiftSwapRequestSchema,
            }),
          },
        },
        uncancel: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/shiftSwapRequests/:id/uncancel',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSwapRequest: ShiftSwapRequestSchema,
            }),
          },
        },
        unreject: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/shiftSwapRequests/:id/unreject',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSwapRequest: ShiftSwapRequestSchema,
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/shiftSwapRequests/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({
              shiftSwapRequest: ShiftSwapRequestUpdatePayloadSchema,
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              shiftSwapRequest: ShiftSwapRequestSchema,
            }),
          },
        },
      },
      show: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/accounts/:id',
        pathParams: z.object({ id: z.string() }),
        response: {
          body: z.object({
            account: AccountSchema,
            meta: z.record(z.string(), z.unknown()).optional(),
          }),
        },
      },
      sites: {
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/sites',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ site: SiteCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              site: SiteSchema,
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/sites/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/sites',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([SiteFilterSchema, z.array(SiteFilterSchema)])
                .optional(),
              page: SitePageSchema.optional(),
              sort: z
                .union([SiteSortSchema, z.array(SiteSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              sites: z.array(SiteSchema),
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/sites/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              site: SiteSchema,
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/sites/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ site: SiteUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              site: SiteSchema,
            }),
          },
        },
      },
      teams: {
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/teams',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ team: TeamCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              team: TeamSchema,
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/teams/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/teams',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([TeamFilterSchema, z.array(TeamFilterSchema)])
                .optional(),
              page: TeamPageSchema.optional(),
              sort: z
                .union([TeamSortSchema, z.array(TeamSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              teams: z.array(TeamSchema),
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/teams/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              team: TeamSchema,
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/teams/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ team: TeamUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              team: TeamSchema,
            }),
          },
        },
      },
      timeEntries: {
        approve: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/timeEntries/:id/approve',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              timeEntry: TimeEntrySchema,
            }),
          },
        },
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/timeEntries',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ timeEntry: TimeEntryCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              timeEntry: TimeEntrySchema,
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/timeEntries/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/timeEntries',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([TimeEntryFilterSchema, z.array(TimeEntryFilterSchema)])
                .optional(),
              page: TimeEntryPageSchema.optional(),
              sort: z
                .union([TimeEntrySortSchema, z.array(TimeEntrySortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              timeEntries: z.array(TimeEntrySchema),
            }),
          },
        },
        lock: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/timeEntries/:id/lock',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              timeEntry: TimeEntrySchema,
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/timeEntries/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              timeEntry: TimeEntrySchema,
            }),
          },
        },
        stop: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/timeEntries/:id/stop',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              timeEntry: TimeEntrySchema,
            }),
          },
        },
        unapprove: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/timeEntries/:id/unapprove',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              timeEntry: TimeEntrySchema,
            }),
          },
        },
        unlock: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/timeEntries/:id/unlock',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              timeEntry: TimeEntrySchema,
            }),
          },
        },
        unstop: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/timeEntries/:id/unstop',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              timeEntry: TimeEntrySchema,
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/timeEntries/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ timeEntry: TimeEntryUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              timeEntry: TimeEntrySchema,
            }),
          },
        },
      },
      update: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'PATCH',
        path: '/accounts/:id',
        pathParams: z.object({ id: z.string() }),
        request: {
          body: z.object({ account: AccountUpdatePayloadSchema }),
        },
        response: {
          body: z.object({
            account: AccountSchema,
            meta: z.record(z.string(), z.unknown()).optional(),
          }),
        },
      },
      workPatterns: {
        create: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'POST',
          path: '/:accountId/workPatterns',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            body: z.object({ workPattern: WorkPatternCreatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              workPattern: WorkPatternSchema,
            }),
          },
        },
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:accountId/workPatterns/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/workPatterns',
          pathParams: z.object({ accountId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([
                  WorkPatternFilterSchema,
                  z.array(WorkPatternFilterSchema),
                ])
                .optional(),
              page: WorkPatternPageSchema.optional(),
              sort: z
                .union([WorkPatternSortSchema, z.array(WorkPatternSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              workPatterns: z.array(WorkPatternSchema),
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:accountId/workPatterns/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              workPattern: WorkPatternSchema,
            }),
          },
        },
        update: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'PATCH',
          path: '/:accountId/workPatterns/:id',
          pathParams: z.object({ accountId: z.string(), id: z.string() }),
          request: {
            body: z.object({ workPattern: WorkPatternUpdatePayloadSchema }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              workPattern: WorkPatternSchema,
            }),
          },
        },
      },
    },
    countries: {
      index: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/countries',
        request: {
          query: z.object({
            filter: z
              .union([CountryFilterSchema, z.array(CountryFilterSchema)])
              .optional(),
            page: CountryPageSchema.optional(),
            sort: z
              .union([CountrySortSchema, z.array(CountrySortSchema)])
              .optional(),
          }),
        },
        response: {
          body: z.object({
            countries: z.array(CountrySchema),
            meta: z.record(z.string(), z.unknown()).optional(),
            pagination: OffsetPaginationSchema,
          }),
        },
      },
      show: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/countries/:id',
        pathParams: z.object({ id: z.string() }),
        response: {
          body: z.object({
            country: CountrySchema,
            meta: z.record(z.string(), z.unknown()).optional(),
          }),
        },
      },
    },
    currencies: {
      index: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/currencies',
        request: {
          query: z.object({
            filter: z
              .union([CurrencyFilterSchema, z.array(CurrencyFilterSchema)])
              .optional(),
            page: CurrencyPageSchema.optional(),
            sort: z
              .union([CurrencySortSchema, z.array(CurrencySortSchema)])
              .optional(),
          }),
        },
        response: {
          body: z.object({
            currencies: z.array(CurrencySchema),
            meta: z.record(z.string(), z.unknown()).optional(),
            pagination: OffsetPaginationSchema,
          }),
        },
      },
      show: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/currencies/:id',
        pathParams: z.object({ id: z.string() }),
        response: {
          body: z.object({
            currency: CurrencySchema,
            meta: z.record(z.string(), z.unknown()).optional(),
          }),
        },
      },
    },
    invites: {
      show: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/invites/:id',
        pathParams: z.object({ id: z.string() }),
        response: {
          body: z.object({
            invite: InviteSchema,
            meta: z.record(z.string(), z.unknown()).optional(),
          }),
        },
      },
      update: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'PATCH',
        path: '/invites/:id',
        pathParams: z.object({ id: z.string() }),
        request: {
          body: z.object({ invite: InviteUpdatePayloadSchema }),
        },
        response: {
          body: z.object({
            invite: InviteSchema,
            meta: z.record(z.string(), z.unknown()).optional(),
          }),
        },
      },
    },
    locales: {
      index: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/locales',
        request: {
          query: z.object({
            filter: z
              .union([LocaleFilterSchema, z.array(LocaleFilterSchema)])
              .optional(),
            page: LocalePageSchema.optional(),
            sort: z
              .union([LocaleSortSchema, z.array(LocaleSortSchema)])
              .optional(),
          }),
        },
        response: {
          body: z.object({
            locales: z.array(LocaleSchema),
            meta: z.record(z.string(), z.unknown()).optional(),
            pagination: OffsetPaginationSchema,
          }),
        },
      },
      show: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/locales/:id',
        pathParams: z.object({ id: z.string() }),
        response: {
          body: z.object({
            locale: LocaleSchema,
            meta: z.record(z.string(), z.unknown()).optional(),
          }),
        },
      },
    },
    user: {
      destroy: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'DELETE',
        path: '/user/:id',
        pathParams: z.object({ id: z.string() }),
        response: {
          body: z.unknown(),
        },
      },
      sessions: {
        destroy: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'DELETE',
          path: '/:userId/sessions/:id',
          pathParams: z.object({ id: z.string(), userId: z.string() }),
          response: {
            body: z.unknown(),
          },
        },
        index: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:userId/sessions',
          pathParams: z.object({ userId: z.string() }),
          request: {
            query: z.object({
              filter: z
                .union([SessionFilterSchema, z.array(SessionFilterSchema)])
                .optional(),
              page: SessionPageSchema.optional(),
              sort: z
                .union([SessionSortSchema, z.array(SessionSortSchema)])
                .optional(),
            }),
          },
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              pagination: OffsetPaginationSchema,
              sessions: z.array(SessionSchema),
            }),
          },
        },
        show: {
          errors: [400, 401, 403, 404, 409, 422, 500],
          method: 'GET',
          path: '/:userId/sessions/:id',
          pathParams: z.object({ id: z.string(), userId: z.string() }),
          response: {
            body: z.object({
              meta: z.record(z.string(), z.unknown()).optional(),
              session: SessionSchema,
            }),
          },
        },
      },
      show: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/user/:id',
        pathParams: z.object({ id: z.string() }),
        response: {
          body: z.object({
            meta: z.record(z.string(), z.unknown()).optional(),
            user: UserSchema,
          }),
        },
      },
      update: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'PATCH',
        path: '/user/:id',
        pathParams: z.object({ id: z.string() }),
        request: {
          body: z.object({ user: UserUpdatePayloadSchema }),
        },
        response: {
          body: z.object({
            meta: z.record(z.string(), z.unknown()).optional(),
            user: UserSchema,
          }),
        },
      },
    },
    workPatternTemplates: {
      index: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/workPatternTemplates',
        request: {
          query: z.object({
            filter: z
              .union([
                WorkPatternTemplateFilterSchema,
                z.array(WorkPatternTemplateFilterSchema),
              ])
              .optional(),
            page: WorkPatternTemplatePageSchema.optional(),
            sort: z
              .union([
                WorkPatternTemplateSortSchema,
                z.array(WorkPatternTemplateSortSchema),
              ])
              .optional(),
          }),
        },
        response: {
          body: z.object({
            meta: z.record(z.string(), z.unknown()).optional(),
            pagination: OffsetPaginationSchema,
            workPatternTemplates: z.array(WorkPatternTemplateSchema),
          }),
        },
      },
      show: {
        errors: [400, 401, 403, 404, 409, 422, 500],
        method: 'GET',
        path: '/workPatternTemplates/:id',
        pathParams: z.object({ id: z.string() }),
        response: {
          body: z.object({
            meta: z.record(z.string(), z.unknown()).optional(),
            workPatternTemplate: WorkPatternTemplateSchema,
          }),
        },
      },
    },
  },
  error: ErrorResponseBodySchema,
} as const;
