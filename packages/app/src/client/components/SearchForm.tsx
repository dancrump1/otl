import React from "react";

import { useRouter } from "next/navigation";

import { PlaceholdersAndVanishInput } from "./library/Searchbar";

const SearchForm = ({ setLoading, loading }) => {
	const router = useRouter();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>, value: string) => {
		e?.preventDefault();

		router.replace(`/search/?query=${value}`);
	};

	return (
		<PlaceholdersAndVanishInput
			onSubmit={onSubmit}
			setLoading={setLoading}
			loading={loading}
		/>
	);
};

export default SearchForm;
