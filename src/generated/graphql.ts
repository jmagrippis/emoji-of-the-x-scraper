import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Upload: any
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Emoji = {
  __typename?: 'Emoji'
  id: Scalars['ID']
  character: Scalars['String']
  name: Scalars['String']
  created_at: Scalars['String']
  anchor: Scalars['String']
  type: EmojiType
}

export enum EmojiType {
  Day = 'day',
  Week = 'week',
  Month = 'month',
}

export type Query = {
  __typename?: 'Query'
  emoji?: Maybe<Emoji>
  emojis: Array<Emoji>
  trio: Trio
  hashtags: Array<Scalars['String']>
}

export type QueryEmojiArgs = {
  id: Scalars['ID']
  type: EmojiType
}

export type QueryEmojisArgs = {
  anchor?: Maybe<Scalars['String']>
  type: EmojiType
}

export type QueryTrioArgs = {
  anchor?: Maybe<Scalars['String']>
  type?: Maybe<EmojiType>
}

export type Trio = {
  __typename?: 'Trio'
  current: Emoji
  previous?: Maybe<Emoji>
  next?: Maybe<Emoji>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  ID: ResolverTypeWrapper<Scalars['ID']>
  EmojiType: EmojiType
  Emoji: ResolverTypeWrapper<Emoji>
  String: ResolverTypeWrapper<Scalars['String']>
  Trio: ResolverTypeWrapper<Trio>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  CacheControlScope: CacheControlScope
  Upload: ResolverTypeWrapper<Scalars['Upload']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  ID: Scalars['ID']
  EmojiType: EmojiType
  Emoji: Emoji
  String: Scalars['String']
  Trio: Trio
  Boolean: Scalars['Boolean']
  CacheControlScope: CacheControlScope
  Upload: Scalars['Upload']
}

export type EmojiResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Emoji'] = ResolversParentTypes['Emoji']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  character?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  anchor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['EmojiType'], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  emoji?: Resolver<
    Maybe<ResolversTypes['Emoji']>,
    ParentType,
    ContextType,
    RequireFields<QueryEmojiArgs, 'id' | 'type'>
  >
  emojis?: Resolver<
    Array<ResolversTypes['Emoji']>,
    ParentType,
    ContextType,
    RequireFields<QueryEmojisArgs, 'type'>
  >
  trio?: Resolver<
    ResolversTypes['Trio'],
    ParentType,
    ContextType,
    QueryTrioArgs
  >
  hashtags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
}

export type TrioResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Trio'] = ResolversParentTypes['Trio']
> = {
  current?: Resolver<ResolversTypes['Emoji'], ParentType, ContextType>
  previous?: Resolver<Maybe<ResolversTypes['Emoji']>, ParentType, ContextType>
  next?: Resolver<Maybe<ResolversTypes['Emoji']>, ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = {
  Emoji?: EmojiResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Trio?: TrioResolvers<ContextType>
  Upload?: GraphQLScalarType
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
