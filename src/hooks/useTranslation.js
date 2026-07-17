import { useMemo } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/i18n/translations';

export function useTranslation() {
	const { language, setLanguage, toggleLanguage } = useLanguage();
	const t = useMemo(() => translations[language] ?? translations.es, [language]);

	return {
		t,
		language,
		setLanguage,
		toggleLanguage,
	};
}
