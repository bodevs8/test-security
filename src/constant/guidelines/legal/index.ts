import { GUIDELINE_LINKS } from '@/constant/guidelines/guideline';
import { CHINH_SACH_QUYEN_RIENG_TU } from './chinh-sach-quyen-rieng-tu';
import { DIEU_KHOAN_DIEU_KIEN } from './dieu-khoan-dieu-kien';
import { SU_KIEN_VA_KHUYEN_MAI } from './su-kien-va-khuyen-mai';
import { TRUNG_TAM_HO_TRO } from './trung-tam-ho-tro';
import { VE_CHUNG_TOI } from './ve-chung-toi';

export const LEGAL_GUIDELINES = {
  [GUIDELINE_LINKS.TERMS_AND_CONDITIONS]: DIEU_KHOAN_DIEU_KIEN,
  [GUIDELINE_LINKS.PRIVACY_POLICY]: CHINH_SACH_QUYEN_RIENG_TU,
  [GUIDELINE_LINKS.PROMOTION_TERM]: SU_KIEN_VA_KHUYEN_MAI,
  [GUIDELINE_LINKS.HELP_CENTER]: TRUNG_TAM_HO_TRO,
  [GUIDELINE_LINKS.ABOUT_US]: VE_CHUNG_TOI,
};

export default LEGAL_GUIDELINES;
