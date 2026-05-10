import {HelpCircleIcon, LockIcon, UsersIcon, TagIcon, DocumentTextIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureResolver} from 'sanity/structure'
import {apiVersion} from './env'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blog').title('Blog'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      orderableDocumentListDeskItem({
        type: 'openPosition',
        title: 'Open Positions',
        id: 'openPosition',
        icon: DocumentTextIcon,
        S,
        context,
      }),
      S.divider(),
      S.listItem()
        .id('help-center-section')
        .title('Help Center')
        .icon(HelpCircleIcon)
        .child(
          S.list()
            .title('Help Center')
            .items([
              S.listItem()
                .id('help-center-topics')
                .title('Topics')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('Topics')
                    .items([
                      orderableDocumentListDeskItem({
                        type: 'helpTopic',
                        title: 'Admin Topics',
                        id: 'helpTopic-admin',
                        icon: LockIcon,
                        filter: 'audience == "admin"',
                        S,
                        context,
                      }),
                      orderableDocumentListDeskItem({
                        type: 'helpTopic',
                        title: 'Creator Topics',
                        id: 'helpTopic-creator',
                        icon: UsersIcon,
                        filter: 'audience == "creator"',
                        S,
                        context,
                      }),
                      orderableDocumentListDeskItem({
                        type: 'helpTopic',
                        title: 'Brand Topics',
                        id: 'helpTopic-brand',
                        icon: TagIcon,
                        filter: 'audience == "brand"',
                        S,
                        context,
                      }),
                    ])
                ),
              S.listItem()
                .id('help-center-faqs')
                .title('FAQs')
                .icon(HelpCircleIcon)
                .child(
                  S.list()
                    .title('FAQs')
                    .items([
                      orderableDocumentListDeskItem({
                        type: 'faq',
                        title: 'Admin FAQs',
                        id: 'faq-admin',
                        icon: LockIcon,
                        filter: 'audience == "admin"',
                        S,
                        context,
                      }),
                      orderableDocumentListDeskItem({
                        type: 'faq',
                        title: 'Creator FAQs',
                        id: 'faq-creator',
                        icon: UsersIcon,
                        filter: 'audience == "creator"',
                        S,
                        context,
                      }),
                      orderableDocumentListDeskItem({
                        type: 'faq',
                        title: 'Brand FAQs',
                        id: 'faq-brand',
                        icon: TagIcon,
                        filter: 'audience == "brand"',
                        S,
                        context,
                      }),
                    ])
                ),
              S.listItem()
                .id('help-center-settings')
                .title('Settings')
                .icon(TagIcon)
                .child(
                  S.documentList()
                    .title('Help Center Settings')
                    .apiVersion(apiVersion)
                    .filter('_type == "helpCenter"')
                ),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['blog', 'category', 'author', 'openPosition', 'faq', 'helpCenter', 'helpTopic'].includes(item.getId()!),
      ),
    ])
