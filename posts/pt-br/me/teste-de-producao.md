---
id: 468d70a8-b22c-4801-a2ef-e21625d264dc
title: Teste de produção
alias: teste-de-producao
series: Inicial
cover_image: https://images.unsplash.com/photo-1682685797208-c741d58c2eff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80
path: posts/pt-br/me/teste-de-producao
created_at: 2023-05-04T00:38:49.4949-03:00
lang: pt-br
draft: false
tags: [opiniao, formada]
---
![Cover Image](https://images.unsplash.com/photo-1682685797208-c741d58c2eff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)

tags: #opiniao #formada
series: Inicial

# Teste de produção

## Introdução  
a nova opinião
 
## Seção de pré-requisitos  

```js
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: '#foo' })
  }
}
```
 
## Corpo do artigo  


```ts
import Link from 'next/link'
import Image from 'next/image'
import { SerializeOptions } from 'next-mdx-remote/dist/types'

import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHightight from 'rehype-highlight'
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import remarkToc from 'remark-toc'
import remarkRehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import rehypeStringify from 'rehype-stringify'
import { Code } from 'bright'

Code.lineNumbers = true
Code.theme = 'github-light'
Code.theme = {
  dark: 'github-dark',
  light: 'github-light'
}

export const componentsMdx = {
  img: ({ src, alt }: { src: string; alt: string }) => (

    <figure className="w-full max-w-none">
      <Image
        src={src || ''}
        width={1024}
        height={1024}
        alt={alt}
        className="w-full rounded-lg object-cover transition duration-200 ease-in-out hover:brightness-110"
      />
    </figure>
  )
}

interface MdxProps {
  code: string
}

export const optionsMdx: SerializeOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkA11yEmoji, remarkToc, remarkRehype, remarkParse],
    rehypePlugins: [
      rehypeHightight,
      rehypeStringify,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ]
  }
}
```
 
## Conclusão  

 
## Recursos adicionais e links  

 
## Sobre o autor
Meu nome é Thiago Murtinho, empreendedor, desenvolvedor e entusiasta de tecnologia. Adoro compartilhar conhecimento e ajudar a comunidade de desenvolvedores a crescer.



