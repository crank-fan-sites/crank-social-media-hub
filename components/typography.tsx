export function HeadingH1({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <h1
      className={`scroll-m-20 mb-4 text-4xl font-light tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}

export function HeadingH2({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <h2
      className={`scroll-m-20 mb-4 text-3xl font-light tracking-tight transition-colors first:mt-0 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function HeadingH3({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <h3
      className={`scroll-m-20 mb-4 text-2xl font-light tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function HeadingH4({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <h4
      className={`scroll-m-20 mb-4 text-lg font-light tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
}

export function HeadingH5({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <h5
      className={`scroll-m-20 mb-4 text-base font-light tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
}

export function HeadingH6({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <h6
      className={`scroll-m-20 mb-4 text-sm font-light tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h6>
  );
}

export function Paragraph({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <p className={`text-sm leading-6 mb-6 ${className}`} {...props}>
      {children}
    </p>
  );
}
export function TypographyBlockquote({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <blockquote
      className={`mt-6 border-l-2 pl-6 italic ${className}`}
      {...props}
    >
      {children}
    </blockquote>
  );
}

// wip
export function TypographyList() {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
  );
}

export function TypographyLead({ children, ...props }: { children: any }) {
  return (
    <p className="text-xl text-muted-foreground" {...props}>
      {children}
    </p>
  );
}

export function TypographyLarge({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <div className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </div>
  );
}

export function TypographySmall({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <small
      className={`text-sm font-medium leading-none ${className}`}
      {...props}
    >
      {children}
    </small>
  );
}

export function TypographyMuted({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <p className="text-sm text-muted-foreground" {...props}>
      {children}
    </p>
  );
}
