import { Cafe27b as Cafe27bComponent } from '@/components/business';
import {
  mainImages,
  menuItems,
  productItems,
  cateringServices,
  mobileCafeServices,
} from '@/components/business/data';

function Cafe27b() {
  return (
    <div className="w-full py-8">
      <Cafe27bComponent
        mainImages={mainImages}
        menuItems={menuItems}
        productItems={productItems}
        cateringServices={cateringServices}
        mobileCafeServices={mobileCafeServices}
      />
    </div>
  );
}

export default Cafe27b;
