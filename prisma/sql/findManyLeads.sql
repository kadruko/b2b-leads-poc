SELECT o."id" AS "organizationId",
    o."name" AS "organizationName",
    SUM(
        CASE
            WHEN e."name" = 'alert_displayed' THEN 0
            WHEN e."name" = 'cart_viewed' THEN 2
            WHEN e."name" = 'checkout_address_info_submitted' THEN 5
            WHEN e."name" = 'checkout_completed' THEN 10
            WHEN e."name" = 'checkout_contact_info_submitted' THEN 4
            WHEN e."name" = 'checkout_shipping_info_submitted' THEN 4
            WHEN e."name" = 'checkout_started' THEN 3
            WHEN e."name" = 'collection_viewed' THEN 1
            WHEN e."name" = 'page_viewed' THEN 1
            WHEN e."name" = 'payment_info_submitted' THEN 6
            WHEN e."name" = 'product_added_to_cart' THEN 3
            WHEN e."name" = 'product_removed_from_cart' THEN 0
            WHEN e."name" = 'product_viewed' THEN 3
            WHEN e."name" = 'search_submitted' THEN 2
            WHEN e."name" = 'ui_extension_errored' THEN 0
            ELSE 0
        END
    ) AS "leadScore"
FROM "Organization" o
    INNER JOIN "Event" e ON o."id" = e."organizationId"
    AND e."shop" = $1
GROUP BY o."id",
    o."name"
ORDER BY "leadScore" DESC;