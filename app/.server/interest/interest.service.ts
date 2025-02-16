import { findManyInterests } from '@prisma/client/sql';
import { AdminContext } from '@shopify/shopify-app-remix/server';
import { Interest } from '../../.common/interest/interest';
import prisma from '../../db.server';
import { productVariantService } from '../shopify/product-variant/product-variant.service';

class InterestService {
  public async findMany(context: AdminContext, organizationId: string) {
    let interests: any[] = await prisma.$queryRawTyped(
      findManyInterests(context.session.shop, organizationId),
    );
    interests = await this.enrich(context, interests);
    interests = interests.map((interest) => this.map(interest));
    return interests;
  }

  private async enrich(context: AdminContext, interests: Interest[]) {
    const productVariantIds = interests.map(
      (interest) => interest.productVariantId,
    );
    const productVariants = await productVariantService.findMany(
      context,
      productVariantIds,
    );
    return interests.map((interest) => ({
      ...interest,
      productVariant: productVariants.find(
        (pv) => pv.id === interest.productVariantId,
      ),
    }));
  }

  private map(interest: any): Interest {
    let interestScore = 0;
    if (interest.interestScore) {
      interestScore = Number(interest.interestScore.toString());
    }
    return {
      ...interest,
      interestScore,
    };
  }
}

export const interestService = new InterestService();
