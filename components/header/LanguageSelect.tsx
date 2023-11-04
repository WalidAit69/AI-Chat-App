"use client";

import {
  LanguagesSupported,
  LanguagesSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/store/store";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "../LoadingSpinner";
import Link from "next/link";

function LanguageSelect() {
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages,
    ]);

  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro = subscription?.status === "active";

  const pathName = usePathname();
  const isChatPage = pathName.includes("/chat");

  return (
    isChatPage && (
      <>
        <Select
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] ">
            <SelectValue placeholder={LanguagesSupportedMap[language]} />
          </SelectTrigger>

          <SelectContent>
            {subscription === undefined ? (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {getLanguages(isPro).map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {LanguagesSupportedMap[lang]}
                  </SelectItem>
                ))}

                {getNotSupportedLanguages(isPro).map((lang) => (
                  <Link href={"/register"} key={lang} prefetch={false}>
                    <SelectItem
                      key={lang}
                      value={lang}
                      className="bg-gray-300/50 text-gray-500 dark:bg-gray-600 dark:text-white py-2 my-1"
                      disabled
                    >
                      {LanguagesSupportedMap[lang]} (PRO)
                    </SelectItem>
                  </Link>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </>
    )
  );
}

export default LanguageSelect;
