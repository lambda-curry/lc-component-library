export const formatBytes = (bytes: number, decimals: number = 0) => {
    if (bytes === 0) {
        return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const convertMimeTypeToFileType = (mimeType: string): string => {
    let fileType = '';
    const mimeTypeParts = mimeType.split('/');
    const mimeTypeStart = mimeTypeParts[0];
    const mimeTypeEnd = mimeTypeParts[mimeTypeParts.length - 1];

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const mimeTypesMap = {
        image: {
            bmp: 'BMP',
            gif: 'GIF',
            'vnd.microsoft.icon': 'ICO',
            jpeg: 'JPG',
            png: 'PNG',
            'svg+xml': 'SVG',
            tiff: 'TIF',
            webp: 'WEBP'
        },
        audio: {
            aac: 'AAC',
            midi: 'MID',
            'x-midi': 'MID',
            mpeg: 'MP3',
            ogg: 'OGA',
            opus: 'OPUS',
            wav: 'WAV',
            webm: 'WEBM',
            '3gpp': '3GP',
            '3gpp2': '3G2'
        },
        application: {
            'x-abiword': 'ABW',
            'x-freearc': 'ARC',
            'vnd.amazon.ebook': 'AZW',
            'octet-stream': 'BIN',
            'x-bzip': 'BZ',
            'x-bzip2': 'BZ2',
            'x-csh': 'CSH',
            msword: 'DOC',
            'vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
            'vnd.ms-fontobject': 'EOT',
            'epub+zip': 'EPUB',
            gzip: 'GZ',
            'java-archive': 'JAR',
            json: 'JSON',
            'ld+json': 'JSONLD',
            'vnd.apple.installer+xml': 'MPKG',
            'vnd.oasis.opendocument.presentation': 'ODP',
            'vnd.oasis.opendocument.spreadsheet': 'ODS',
            'vnd.oasis.opendocument.text': 'ODT',
            ogg: 'OGX',
            pdf: 'PDF',
            'x-httpd-php': 'PHP',
            'vnd.ms-powerpoint': 'PPT',
            'vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
            'vnd.rar': 'RAR',
            rtf: 'RTF',
            'x-sh': 'SH',
            'x-shockwave-flash': 'SWF',
            'x-tar': 'TAR',
            'vnd.visio': 'VSD',
            'xhtml+xml': 'XHTML',
            'vnd.ms-excel': 'XLS',
            'vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
            xml: 'XML',
            'vnd.mozilla.xul+xml': 'XUL',
            zip: 'ZIP',
            'x-7z-compressed': '7Z'
        },
        text: {
            css: 'CSS',
            csv: 'CSV',
            html: 'HTML',
            calendar: 'ICS',
            javascript: 'JS',
            plain: 'TXT',
            xml: 'XML'
        },
        video: {
            'x-msvideo': 'AVI',
            mpeg: 'MPEG',
            ogg: 'OGV',
            mp2t: 'TS',
            webm: 'WEBM',
            '3gpp': '3GP',
            '3gpp2': '3G2'
        },
        font: {
            otf: 'OTF',
            ttf: 'TTF',
            woff: 'WOFF',
            woff2: 'WOFF2'
        }
    };

    fileType = mimeTypesMap[mimeTypeStart] && (mimeTypesMap[mimeTypeStart][mimeTypeEnd] || '');

    if (!fileType) {
        fileType = mimeTypeEnd.toUpperCase();
    }

    return fileType;
};

export const formatMimeTypesForDisplay = (mimeTypes: string[]): string =>
    mimeTypes.reduce((acc, curr, index, inputArray) => {
        if (index !== 0) {
            acc += inputArray.length > 2 ? ', ' : ' ';
        }

        if (index === inputArray.length - 1 && inputArray.length > 1) {
            acc += 'or ';
        }

        acc += convertMimeTypeToFileType(curr);

        if (inputArray.length === 1) {
            acc += ' only';
        }

        return acc;
    }, '');
