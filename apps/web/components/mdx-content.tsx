'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'

// import {MDXComponents} from "./mdx-components";

interface MDXContentProps {
  code: string
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)

  return (
    <div className='mdx'>
      <Component />
    </div>
  )
}
