export interface KinopoiskSearchMovieResponse {
  docs: KinopoiskSearchMovie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface KinopoiskSearchMovie {
  id: number;
  name?: string;
  alternativeName?: string;
  enName?: string;
  type?: string;
  year?: number;
  description?: string;
  shortDescription?: string;
  movieLength?: number;
  // "names"?: {
  //   "nullable": true,
  //   "type": "array",
  //   "items": {
  //     "$ref": "#/components/schemas/Name"
  //   }
  // },
  // "externalId": {
  //   "nullable": true,
  //   "allOf": [
  //     {
  //       "$ref": "#/components/schemas/ExternalId"
  //     }
  //   ]
  // },
  // "logo": {
  //   "nullable": true,
  //   "allOf": [
  //     {
  //       "$ref": "#/components/schemas/Logo"
  //     }
  //   ]
  // },
  // "poster": {
  //   "nullable": true,
  //   "allOf": [
  //     {
  //       "$ref": "#/components/schemas/ShortImage"
  //     }
  //   ]
  // },
  // "backdrop": {
  //   "nullable": true,
  //   "allOf": [
  //     {
  //       "$ref": "#/components/schemas/ShortImage"
  //     }
  //   ]
  // },
  // "rating": {
  //   "nullable": true,
  //   "allOf": [
  //     {
  //       "$ref": "#/components/schemas/Rating"
  //     }
  //   ]
  // },
  // "votes": {
  //   "nullable": true,
  //   "allOf": [
  //     {
  //       "$ref": "#/components/schemas/Votes"
  //     }
  //   ]
  // },
  // "genres": {
  //   "nullable": true,
  //   "type": "array",
  //   "items": {
  //     "$ref": "#/components/schemas/ItemName"
  //   }
  // },
  // "countries": {
  //   "nullable": true,
  //   "type": "array",
  //   "items": {
  //     "$ref": "#/components/schemas/ItemName"
  //   }
  // },
  // "releaseYears": {
  //   "nullable": true,
  //   "type": "array",
  //   "items": {
  //     "$ref": "#/components/schemas/YearRange"
  //   }
  // },
  // "isSeries": {
  //   "type": "boolean",
  //   "nullable": true
  // },
  // "ticketsOnSale": {
  //   "type": "boolean",
  //   "nullable": true
  // },
  // "totalSeriesLength": {
  //   "type": "number",
  //   "nullable": true
  // },
  // "seriesLength": {
  //   "type": "number",
  //   "nullable": true
  // },
  // "ratingMpaa": {
  //   "type": "string",
  //   "nullable": true
  // },
  // "ageRating": {
  //   "type": "number",
  //   "nullable": true
  // },
  // "top10": {
  //   "type": "number",
  //   "nullable": true
  // },
  // "top250": {
  //   "type": "number",
  //   "nullable": true
  // },
  // "typeNumber": {
  //   "type": "number",
  //   "nullable": true
  // },
  // "status": {
  //   "type": "string",
  //   "nullable": true
  // }
}
