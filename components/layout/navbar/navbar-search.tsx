import NavbarSearchField from "./navbar-search-field";

export default function NavbarSearch() {
  return (
    <NavbarSearchField
      className="hidden md:block"
      inputClassName="md:w-65 lg:w-80"
      popoverWidth="desktop"
    />
  );
}
