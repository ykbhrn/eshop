export function seo(data = {}) {
  data.title = data.title || 'Default title';
  data.metaDescription = data.metaDescription || 'Default description';

  document.title = data.title;
  document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
}

export const mainMetaDescription = "Our main job is selling fairtrade, eco-friendly accessories, and vitamin supplements. We plan to organize speeches, debates, festivals etc."