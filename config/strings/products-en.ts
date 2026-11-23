import type { Product } from '@/lib/products';

type TranslatedProduct = Pick<Product, 'name' | 'subtitle' | 'summary' | 'description' | 'features' | 'platform' | 'tags' | 'imageAlt'>;

/** The Vietnamese product catalog lives in content/products.json. */
export const productsEn: Record<string, TranslatedProduct> = {
  'lang-viet-puzzle': {
    name: 'Vietnamese Village Puzzle', subtitle: 'A little village with plenty to discover.',
    summary: 'A relaxed puzzle game concept about arranging pieces to create a miniature Vietnamese village.',
    description: 'Vietnamese Village Puzzle is a demonstration concept for a gentle puzzle experience. Players may eventually connect paths, gardens, and rooftops to complete village scenes. Illustrations are concept art, not screenshots of working gameplay.',
    features: ['Arrange landscape tiles into a village', 'Short, relaxing puzzle levels', 'Visuals inspired by Vietnamese rural life'],
    platform: 'Mobile · concept only', tags: ['Puzzle', 'Relaxing'],
    imageAlt: 'Glowing blue game controller, illustrative concept art',
  },
  'hanh-trinh-phuong-nam': {
    name: 'Southern Journey', subtitle: 'Every island invites a new discovery.',
    summary: 'An exploration game concept with floating islands and environmental challenges.',
    description: 'Southern Journey is an illustrative exploration game idea. The imagined world features floating islands connected by portals. All descriptions and mechanics are early-stage concepts, not shipped product features.',
    features: ['Explore floating island environments', 'Collect fragments to unlock portals', 'Combine exploration with environmental puzzles'],
    platform: 'PC / Mobile · concept only', tags: ['Exploration', 'Adventure'],
    imageAlt: 'A blue digital globe with a glowing cyan orbit, illustrative concept art',
  },
  'pn-workspace': {
    name: 'PN Workspace', subtitle: 'Bring your work into one space.',
    summary: 'A lightweight project space concept for tasks, notes, and planning in small creative teams.',
    description: 'PN Workspace is demonstration content for a work management software concept. It focuses on tracking projects and keeping related notes together. This site does not provide a functioning application or trial accounts.',
    features: ['Project-based task boards', 'Notes linked to tasks', 'Weekly planning overview'],
    platform: 'Web app · concept only', tags: ['Productivity', 'Collaboration'],
    imageAlt: 'Blue software interface with glowing task panels',
  },
  'pn-asset-library': {
    name: 'PN Asset Library', subtitle: 'Organized resources, uninterrupted ideas.',
    summary: 'A digital asset library concept to help small teams organize and find production resources.',
    description: 'PN Asset Library is a software concept used to illustrate the website structure. The idea is to group images, audio, and documents by project. Uploading and storage features have not been implemented on this website.',
    features: ['Organize assets with tags', 'Search by project and file type', 'Record source information and asset versions'],
    platform: 'Web app · concept only', tags: ['Assets', 'Organization'],
    imageAlt: 'Illustration of a blue toolbox and glowing gears',
  },
  'sprite-kit': {
    name: 'Sprite Kit', subtitle: 'Prepare artwork for the world you are building.',
    summary: 'A utility concept for organizing sprites and preparing graphic sets for 2D games.',
    description: 'Sprite Kit is demonstration content for a potential 2D game utility. The capabilities below are exploratory ideas only. No image processing or downloadable tool is available on this site.',
    features: ['Group and organize sprites', 'Preview animation frame order', 'Prepare sprite sheet layouts'],
    platform: 'Desktop · concept only', tags: ['2D games', 'Graphics'],
    imageAlt: 'Illustration of a blue toolbox and glowing gears',
  },
  'level-sketch': {
    name: 'Level Sketch', subtitle: 'Sketch one level and discover many possibilities.',
    summary: 'A level planning concept for mapping layouts and documenting interaction points.',
    description: 'Level Sketch is an illustrative concept for a level-planning utility. The idea is to arrange blocks of terrain and annotate movement before detailed development. There is currently no working online editor or released download.',
    features: ['Sketch terrain with basic blocks', 'Mark interactive locations', 'Add design notes by area'],
    platform: 'Web / Desktop · concept only', tags: ['Level design', 'Prototype'],
    imageAlt: 'Illustration of a glowing blue game controller and floating pixels',
  },
};
