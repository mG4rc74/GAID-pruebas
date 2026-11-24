import {
  MapPin, FileText, ScrollText, IdCard, Fingerprint, ShieldCheck, Landmark, CreditCard,
  HandHeart, PiggyBank, Laptop, CalendarCheck, BookOpen, ListChecks, Link2, type LucideIcon,
} from "lucide-react";

export const MODULE_ICONS: Record<string, LucideIcon> = {
  ruta: MapPin, documentos: FileText, acta: ScrollText, ine: IdCard, curp: Fingerprint,
  seguros: ShieldCheck, bancos: Landmark, creditos: CreditCard, apoyos: HandHeart,
  afore: PiggyBank, digital: Laptop, control: CalendarCheck, glosario: BookOpen,
  resumen: ListChecks, fuentes: Link2,
};
