import { MockServerService } from './mock-server.service';
import { SearchAttributeResolver } from './search-attribute-resolver.service';
import { SearchAttributeModelResolver } from './search-attribute-model-resolver.service';
import { UrlRecognitionService } from './url-recognition.service';
import { ItemDetailsResolverService } from './item-details-resolver.service';

export { SearchAttributeResolver } from './search-attribute-resolver.service';
export { SearchAttributeModelResolver } from './search-attribute-model-resolver.service';
export { ItemDetailsResolverService } from './item-details-resolver.service';

export const services = [
    SearchAttributeModelResolver,
    MockServerService,
    SearchAttributeResolver,
    UrlRecognitionService,
    ItemDetailsResolverService
];
