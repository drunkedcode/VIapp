import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MapPin, ChevronDown, ChevronLeft } from "lucide-react";

import DropdownSelect from "@/Shared/ui/forms/DropdownSelect";
import { useSidebarStore } from "./store/useSidebarStore";
import { useGeoLocationStore } from "@/Shared/store/useGeoLocationStore";

const NEIGHBORHOODS = [
  { value: "zumbi-dos-palmares", label: "Zumbi dos Palmares" },
  { value: "centro", label: "Centro" },
  { value: "sao-bento", label: "São Bento" },
];

const CURRENT_LOCATION = "__current_location__";

// Pantallas que utilizan el Navbar secundario.
const SECONDARY_PAGES = [
  { path: "/profile", title: "Meu perfil" },
  { path: "/business/create", title: "Criar negócio" },
  { path: "/business/create/welcome", title: "Bem-vindo" },
];

export default function Navbar() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<
    string | null
  >(null);

  const location = useLocation();
  const navigate = useNavigate();

  const currentNeighborhood = useGeoLocationStore(
    (state) => state.currentNeighborhood,
  );

  const initLocation = useGeoLocationStore((state) => state.initLocation);

  const isOpen = useSidebarStore((state) => state.isOpen);
  const open = useSidebarStore((state) => state.open);

  const secondaryPage = SECONDARY_PAGES.find(
    (page) =>
      location.pathname === page.path ||
      location.pathname.startsWith(`${page.path}/`),
  );

  const isSecondary = Boolean(secondaryPage);

  useEffect(() => {
    if (!isSecondary) {
      void initLocation();
    }
  }, [isSecondary, initLocation]);

  const detectedNeighborhood = currentNeighborhood?.trim() || null;

  const selectedOption = NEIGHBORHOODS.find(
    (item) => item.value === selectedNeighborhood,
  );

  const displayedNeighborhood =
    selectedOption?.label ?? detectedNeighborhood ?? "Localizando...";

  const options = [
    {
      value: CURRENT_LOCATION,
      label: detectedNeighborhood || "Localizando...",
    },
    ...NEIGHBORHOODS,
  ];

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/feed");
    }
  };

  return (
    <header
      className="sticky top-0 z-30 flex min-h-[60px] items-center gap-2 px-3"
      style={{
        paddingTop: "calc(0.5rem + env(safe-area-inset-top))",
        paddingBottom: "0.65rem",
        background: "var(--navbar-bg)",
        borderBottom: "1px solid var(--navbar-border)",
      }}
    >
      {isSecondary ? (
        /* MODO SECUNDARIO */
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Voltar"
            className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full"
            style={{ color: "var(--brand-primary)" }}
          >
            <ChevronLeft size={26} />
          </button>

          <h1
            className="truncate text-base font-semibold"
            style={{ color: "var(--navbar-text)" }}
          >
            {secondaryPage?.title}
          </h1>
        </div>
      ) : (
        /* MODO PRINCIPAL */
        <>
          <div className="flex shrink-0 items-center gap-1.5">
            <img
              src="/vi-logo-master-1024.png"
              alt="VI"
              className="h-9 w-9 object-contain"
            />

            <img
              src="/vi-wordmark.svg"
              alt="VI"
              className="hidden h-auto w-10 min-[400px]:block"
            />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <DropdownSelect
              className="min-w-0"
              ariaLabel="Escolher bairro"
              align="right"
              options={options}
              value={selectedNeighborhood ?? CURRENT_LOCATION}
              onChange={(value) => {
                setSelectedNeighborhood(
                  value === CURRENT_LOCATION ? null : value,
                );
              }}
              trigger={
                <>
                  <MapPin
                    size={15}
                    className="shrink-0"
                    style={{ color: "var(--navbar-accent)" }}
                  />

                  <span
                    className="max-w-[115px] truncate font-semibold"
                    style={{ color: "#111827" }}
                  >
                    {displayedNeighborhood}
                  </span>

                  <ChevronDown
                    size={14}
                    className="shrink-0"
                    style={{ color: "#111827" }}
                  />
                </>
              }
            />
          </div>
        </>
      )}

      {/* MENU SEMPRE DISPONÍVEL */}
      <button
        type="button"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors hover:opacity-80"
        style={{
          color: "var(--navbar-text)",
          background: "var(--navbar-btn-bg)",
          border: "1px solid var(--navbar-btn-border)",
        }}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        aria-controls="app-sidebar"
        onClick={open}
      >
        <Menu size={21} />
      </button>
    </header>
  );
}
