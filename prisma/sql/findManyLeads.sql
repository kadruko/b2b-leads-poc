SELECT o."id" AS "organizationId",
    o."name" AS "organizationName",
    SUM(
        CASE
            WHEN e."name" = 'page_viewed' THEN 1
            WHEN e."name" = 'product_viewed' THEN 3
            ELSE 0
        END
    ) AS "leadScore"
FROM "Organization" o
    JOIN "Event" e ON o."id" = e."organizationId"
GROUP BY o."id",
    o."name"
ORDER BY "leadScore" DESC;