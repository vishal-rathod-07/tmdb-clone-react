// function that returns object of parameters based on category type

const getInitialParams = (showType, category) => {
  if (showType === 'movie') {
    switch (category) {
      case 'popular':
        return {
          'air_date.gte': '',
          //six months from today
          'air_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: 'IN',
          page: 1,
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          'release_date.gte': '',
          'release_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          show_me: 0,
          sort_by: 'popularity.desc',
          'vote_average.gte': 0,
          'vote_average.lte': 10,
          'vote_count.gte': '',
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: '',
          'with_runtime.gte': 0,
          'with_runtime.lte': 400,
        };
      case 'now_playing':
        return {
          'air_date.gte': '',
          'air_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: 'IN',
          page: 1,
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          // 40 days before today
          'release_date.gte': new Date(
            new Date().setDate(new Date().getDate() - 40)
          )
            .toISOString()
            .split('T')[0],
          // 2 days after today
          'release_date.lte': new Date(
            new Date().setDate(new Date().getDate() + 2)
          )
            .toISOString()
            .split('T')[0],
          show_me: 0,
          sort_by: 'popularity.desc',
          'vote_average.gte': 0,
          'vote_average.lte': 10,
          'vote_count.gte': '',
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: 3,
          'with_runtime.gte': 0,
          'with_runtime.lte': 400,
        };
      case 'upcoming':
        return {
          'air_date.gte': '',
          // 6 months from today
          'air_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: 'IN',
          page: 1,
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          // 2 days after today
          'release_date.gte': new Date(
            new Date().setDate(new Date().getDate() + 2)
          )
            .toISOString()
            .split('T')[0],
          // 3 weeks after today
          'release_date.lte': new Date(
            new Date().setDate(new Date().getDate() + 23)
          )
            .toISOString()
            .split('T')[0],
          show_me: 0,
          sort_by: 'popularity.desc',
          'vote_average.gte': 0,
          'vote_average.lte': 10,
          'vote_count.gte': '',
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: 3,
          'with_runtime.gte': 0,
          'with_runtime.lte': 400,
        };
      case 'top_rated':
        return {
          'air_date.gte': '',
          'air_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: 'IN',
          page: 1,
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          'release_date.gte': '',
          'release_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          show_me: 0,
          sort_by: 'vote_average.desc',
          'vote_average.gte': 0,
          'vote_average.lte': 10,
          'vote_count.gte': 300,
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: '',
          'with_runtime.gte': 0,
          'with_runtime.lte': 400,
        };
      case 'tv_popular':
        return {
          'air_date.gte': '',
          //six months from today
          'air_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: 'IN',
          page: 1,
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          'release_date.gte': '',
          'release_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          show_me: 0,
          sort_by: 'popularity.desc',
          'vote_average.gte': 0,
          'vote_average.lte': 10,
          'vote_count.gte': '',
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: '',
          'with_runtime.gte': 0,
          'with_runtime.lte': 400,
        };
      default:
        return {
          'air_date.gte': '',
          'air_date.lte': '',
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: '',
          page: '',
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          'release_date.gte': '',
          'release_date.lte': '',
          show_me: '',
          sort_by: '',
          'vote_average.gte': '',
          'vote_average.lte': '',
          'vote_count.gte': '',
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: '',
          'with_runtime.gte': '',
          'with_runtime.lte': '',
        };
    }
  } else {
    switch (category) {
      case 'popular':
        return {
          'air_date.gte': '',
          //today
          'air_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: 'IN',
          page: 1,
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          'release_date.gte': '',
          'release_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          show_me: 0,
          sort_by: 'popularity.desc',
          'vote_average.gte': 0,
          'vote_average.lte': 10,
          'vote_count.gte': '',
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: '',
          'with_runtime.gte': 0,
          'with_runtime.lte': 400,
        };
      case 'airing_today':
        return {
          'air_date.gte': new Date().toISOString().split('T')[0],
          'air_date.lte': new Date().toISOString().split('T')[0],
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: 'IN',
          page: 1,
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          'release_date.gte': '',
          // 6 months after
          'release_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          show_me: 0,
          sort_by: 'popularity.desc',
          'vote_average.gte': 0,
          'vote_average.lte': 10,
          'vote_count.gte': '',
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: '',
          'with_runtime.gte': 0,
          'with_runtime.lte': 400,
        };
      case 'on_the_air':
        return {
          'air_date.gte': new Date().toISOString().split('T')[0],
          // one week after today
          'air_date.lte': new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .split('T')[0],
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: 'IN',
          page: 1,
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          'release_date.gte': '',
          // 6 months after today
          'release_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          show_me: 0,
          sort_by: 'popularity.desc',
          'vote_average.gte': 0,
          'vote_average.lte': 10,
          'vote_count.gte': '',
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: '',
          'with_runtime.gte': 0,
          'with_runtime.lte': 400,
        };
      case 'top_rated':
        return {
          'air_date.gte': '',
          'air_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: 'IN',
          page: 1,
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          'release_date.gte': '',
          'release_date.lte': new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          )
            .toISOString()
            .split('T')[0],
          show_me: 0,
          sort_by: 'vote_average.desc',
          'vote_average.gte': 0,
          'vote_average.lte': 10,
          'vote_count.gte': 150,
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: '',
          'with_runtime.gte': 0,
          'with_runtime.lte': 400,
        };
      default:
        return {
          'air_date.gte': '',
          'air_date.lte': '',
          certification: '',
          certification_country: 'IN',
          debug: '',
          'first_air_date.gte': '',
          'first_air_date.lte': '',
          ott_region: '',
          page: '',
          'primary_release_date.gte': '',
          'primary_release_date.lte': '',
          region: '',
          'release_date.gte': '',
          'release_date.lte': '',
          show_me: '',
          sort_by: '',
          'vote_average.gte': '',
          'vote_average.lte': '',
          'vote_count.gte': '',
          with_genres: '',
          with_keywords: '',
          with_networks: '',
          with_origin_country: '',
          with_original_language: '',
          with_ott_monetization_types: '',
          with_ott_providers: '',
          with_release_type: '',
          'with_runtime.gte': '',
          'with_runtime.lte': '',
        };
    }
  }
};

export default getInitialParams;
