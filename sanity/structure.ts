import {HelpCircleIcon, LockIcon, UsersIcon, TagIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'
import {apiVersion} from './env'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
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
                .title('Admin FAQs')
                .icon(LockIcon)
                .child(
                  S.documentList()
                    .title('Admin FAQs')
                    .apiVersion(apiVersion)
                    .filter('_type == "faq" && audience == "admin"')
                ),
              S.listItem()
                .title('Creator FAQs')
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title('Creator FAQs')
                    .apiVersion(apiVersion)
                    .filter('_type == "faq" && audience == "creator"')
                ),
              S.listItem()
                .title('Brand FAQs')
                .icon(TagIcon)
                .child(
                  S.documentList()
                    .title('Brand FAQs')
                    .apiVersion(apiVersion)
                    .filter('_type == "faq" && audience == "brand"')
                ),
              S.divider(),
              S.listItem()
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
        (item) => item.getId() && !['post', 'category', 'author', 'faq', 'helpCenter'].includes(item.getId()!),
      ),
    ])
