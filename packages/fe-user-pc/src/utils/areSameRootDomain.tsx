function getRootDomain(domain: string) {
    const parts = domain.split('.');
    const length = parts.length;

    // 处理可能的二级域名（如.co.uk）
    if (length > 2 && (parts[length - 2] === 'co' || parts[length - 2] === 'gov' || parts[length - 2] === 'org')) {
        return parts.slice(-3).join('.');
    }

    // 返回一级域名
    return parts.slice(-2).join('.');
}

export function areSameRootDomain(domain1: string, domain2: string) {
    const rootDomain1 = getRootDomain(domain1);
    const rootDomain2 = getRootDomain(domain2);
    return rootDomain1 === rootDomain2;
}
