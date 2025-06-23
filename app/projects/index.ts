import armaKarmaVeygo from './aramaKarmaVeygo';
import armaKarmaDashboard from './armaKarmaDashboard';
import armaKarmaMarketing from './armaKarmaMarketing';
import att from './att';
import ballen from './ballen';
import flexiplan from './flexiplan';
import metaDashboard from './metaDashboard';
import mod from './mod';
import pipify from './pipify';
import revwise from './revwise';
import samsungSmartThings from './samsungSmartThings';

export interface Project {
	github?: string;
	seoTitle: string;
	seoDescription: string;
	slug: string;
	hosted?: string;
	image: string;
	title: string;
	description: string;
	what: string;
	how: string;
	conclusion: string;
	technologies: string[];
}

export function getBlogBySlug(slug: string): Project | null {
	switch (slug) {
		case 'meta-dashboard':
			return metaDashboard;
		case 'pipify':
			return pipify;
		case 'samsung-smart-things':
			return samsungSmartThings;
		case 'flexiplan':
			return flexiplan;
		case 'revwise':
			return revwise;
		case 'ballen-dashboard':
			return ballen;
		case 'arma-karma-veygo':
			return armaKarmaVeygo;
		case 'mctc-learner-platform':
			return mod;
		case 'anglian-truck-tyres':
			return att;
		case 'arma-karma-marketing':
			return armaKarmaMarketing;
		case 'arma-karma-dashboard':
			return armaKarmaDashboard;

		default:
			return null;
	}
}

const projects: Project[] = [
	metaDashboard,
	pipify,
	samsungSmartThings,
	flexiplan,
	armaKarmaVeygo,
	armaKarmaMarketing,
	ballen,
	revwise,
	mod,
	att,
	armaKarmaDashboard,
];

export default projects;
