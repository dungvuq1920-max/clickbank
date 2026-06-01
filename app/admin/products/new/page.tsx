import { getAdminSites } from '@/lib/sites';
import GenerateArticleForm from '../../dashboard/quick-generate';

export default function NewProductPage() {
  return (
    <main className="p-5 lg:p-8">
      <h1 className="mb-6 text-4xl font-black">Add New Product</h1>
      <GenerateArticleForm sites={getAdminSites()} />
    </main>
  );
}
