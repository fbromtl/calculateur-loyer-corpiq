import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Loader2, Search, X } from 'lucide-react';

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
  type: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  required?: boolean;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  placeholder = '',
  id,
}) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [hasSelected, setHasSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Sync external value changes
  useEffect(() => {
    if (value !== query && !inputRef.current?.matches(':focus')) {
      setQuery(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchAddress = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        format: 'json',
        q: searchQuery,
        countrycodes: 'ca',
        limit: '6',
        addressdetails: '1',
      });

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`,
        {
          headers: {
            'Accept-Language': 'fr',
          },
        }
      );

      if (response.ok) {
        const data: AddressSuggestion[] = await response.json();
        setSuggestions(data);
        setShowDropdown(data.length > 0);
        setHighlightedIndex(-1);
      }
    } catch {
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setHasSelected(false);
    onChange(newValue);

    // Debounce la recherche
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchAddress(newValue);
    }, 250);
  };

  const handleSelect = (suggestion: AddressSuggestion) => {
    // Formater l'adresse proprement (enlever les doublons de pays, etc.)
    const cleanAddress = formatDisplayAddress(suggestion.display_name);
    setQuery(cleanAddress);
    onChange(cleanAddress);
    setShowDropdown(false);
    setHasSelected(true);
    setSuggestions([]);
  };

  const formatDisplayAddress = (displayName: string): string => {
    // L'API Nominatim retourne des adresses très longues avec doublons
    // On garde les 4-5 premiers segments pertinents
    const parts = displayName.split(', ');
    // Supprimer les doublons et les éléments non pertinents
    const seen = new Set<string>();
    const filtered = parts.filter(part => {
      const normalized = part.toLowerCase().trim();
      if (seen.has(normalized)) return false;
      // Exclure "Canada" à la fin
      if (normalized === 'canada') return false;
      seen.add(normalized);
      return true;
    });
    // Limiter à 5 segments
    return filtered.slice(0, 5).join(', ');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    onChange('');
    setSuggestions([]);
    setShowDropdown(false);
    setHasSelected(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        {/* Icone de recherche / pin */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {isLoading ? (
            <Loader2 size={18} className="text-corpiq-blue animate-spin" />
          ) : hasSelected ? (
            <MapPin size={18} className="text-green-600" />
          ) : (
            <Search size={18} className="text-gray-400" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          id={id}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0 && !hasSelected) {
              setShowDropdown(true);
            }
          }}
          placeholder={placeholder}
          autoComplete="off"
          className="input-field pl-10 pr-9 transition-shadow focus:shadow-md"
        />

        {/* Bouton clear */}
        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown des suggestions */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden address-dropdown-enter">
          <div className="py-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.place_id}
                type="button"
                onClick={() => handleSelect(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                  index === highlightedIndex
                    ? 'bg-blue-50 text-corpiq-blue'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <MapPin
                  size={16}
                  className={`flex-shrink-0 mt-0.5 ${
                    index === highlightedIndex ? 'text-corpiq-blue' : 'text-gray-400'
                  }`}
                />
                <span className="text-sm leading-snug">
                  {formatDisplayAddress(suggestion.display_name)}
                </span>
              </button>
            ))}
          </div>
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
            <span className="text-[10px] text-gray-400">
              © OpenStreetMap
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
