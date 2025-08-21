export function track(name: string, props: Record<string, any>) {
  console.log(`[Analytics] ${name}`, props);
  // TODO: Integrate with a real analytics service like GA4
}