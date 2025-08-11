// create a button that uses the backend to create a search ticket url for a given ted_id
// when clicked, it will show a "loading" spinner while it is calling the backend to 
// create the search ticket url. when that returns with a valid URL, the button will 
// change to allow that link to be opened in a new tab

import { useState } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import { ToolsService } from "../../client/services/ToolsService";
import useCustomToast from "../../hooks/useCustomToast";

import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export function FoldseekSearchButton({ ted_id }: { ted_id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchUrl, setSearchUrl] = useState<string | null>(null);

  const showToast = useCustomToast();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const url = await ToolsService.createConsensusDomainFoldseekSearchUrl({
        tedId: ted_id,
      });
      setSearchUrl(url);
    } catch (error) {
        showToast(
          "Error creating Foldseek search URL",
          "There was an error creating the Foldseek search URL. Please try again later.",
          "error",
        );
        console.error("Error creating Foldseek search URL:", error);
        setSearchUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} isLoading={isLoading} disabled={isLoading} colorScheme={ searchUrl ? "blue" : "gray" }>
        {isLoading ? (
            <Spinner size="sm" />
        ) : searchUrl ? (
            <a href={searchUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon boxSize={4} />
            </a>
        ) : (
            <SearchIcon boxSize={4} />
        )}
    </Button>
  );
}