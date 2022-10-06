export enum SortType {
  CreatedAt = 'createdAt',
  Likes = 'usersWhoLike',
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum FilterType {
  All = 'all',
  Favourites = 'fav',
  My = 'my',
}

export const OppositeDirection: Record<SortDirection, SortDirection> = {
  [SortDirection.Asc]: SortDirection.Desc,
  [SortDirection.Desc]: SortDirection.Asc,
};
