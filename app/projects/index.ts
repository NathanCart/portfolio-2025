import armaKarmaVeygo from './aramaKarmaVeygo';
import armaKarmaDashboard from './armaKarmaDashboard';
import armaKarmaMarketing from './armaKarmaMarketing';
import att from './att';
import ballen from './ballen';
import mod from './mod';
import revwise from './revwise';

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
	armaKarmaVeygo,
	armaKarmaMarketing,
	ballen,
	revwise,
	mod,
	att,
	armaKarmaDashboard,
];

export default projects;
