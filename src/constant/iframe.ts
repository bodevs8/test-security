import { ApiEndpointEnum } from '@/enums';

export const IFRAME_SPORTS_GAMES: Record<string, ApiEndpointEnum> = {
  'saba-sports': ApiEndpointEnum.IframeSaba,
  ksports: ApiEndpointEnum.IframeKSports,
  btisports: ApiEndpointEnum.IframeBtiSports,
  imsports: ApiEndpointEnum.IframeImSports,
  'e-saba-sports': ApiEndpointEnum.IframeSabaE,
  'im-esports': ApiEndpointEnum.IframeImPlayE,
  'im-play': ApiEndpointEnum.IframeImPlay,
  volta: ApiEndpointEnum.IframeVolta,
  'virtual-saba-sports': ApiEndpointEnum.IframeSabaVitrual,
  'virtual-ksports': ApiEndpointEnum.IframeKsportVirtual,
  'pp-sports': ApiEndpointEnum.IframePragmaticVirtual,
  'lo-de-sieu-toc': ApiEndpointEnum.IframeLoDeSieuToc,
  'lo-de-3-mien': ApiEndpointEnum.IframeLoDe3Mien,
};
