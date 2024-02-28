import { AdominConfig } from '../adominConfig'
import { createStatsViewConfig } from '../createStatsViewConfig'
import { groupByDayOfWeek, groupByHour } from '../routes/stats/groupByHelpers'

/**
 * This file will contain your Adomin Config
 * For each model you want to have in you backoffice, you will need to add in the "models" array,
 * with the following syntax:
 * createModelConfig(() => YourModel, {})
 */

export const ADOMIN_CONFIG: AdominConfig = {
    title: 'Adomin (edit this)',
    views: [
        createStatsViewConfig({
            label: 'Stats',
            path: 'kpis',
            stats: [
                {
                    label: 'Reservations par jour',
                    name: 'usersPerDay',
                    type: 'area',
                    dataFetcher: () => groupByDayOfWeek('events', 'created_at'),
                },
                {
                    label: '',
                    name: '',
                    type: 'column',
                    dataFetcher: () => groupByHour('events', 'created_at'),
                },
            ],
        }),
    ],
}