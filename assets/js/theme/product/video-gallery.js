import $ from 'jquery';

export class VideoGallery {

    constructor($element){
        this.$player = $element.find('[data-video-player]');
        this.$videos = $element.find('[data-video-item]');
        this.currentVideo = {};
        this.bindEvents();
    }

    selectNewVideo(e) {
        e.preventDefault();

        let $target = $(e.currentTarget);

        this.currentVideo = {
            id: $target.data('video-id'),
            $selectedThumb: $target
        };

        this.setMainVideo();
        this.setActiveThumb();
    }

    setMainVideo() {
        this.$player.attr('src', `http://www.youtube.com/embed/${this.currentVideo.id}`);
    }

    setActiveThumb() {
        this.$videos.removeClass('is-active');
        this.currentVideo.$selectedThumb.addClass('is-active');
    }

    bindEvents() {
        this.$videos.on('click', this.selectNewVideo.bind(this));
    }



}

export default function videoGallery() {
    let pluginKey = 'video-gallery',
        $videoGallery = $(`[data-${ pluginKey }]`);

    $videoGallery.each((index, element) => {
        let $el = $(element),
            isInitialized = $el.data(pluginKey) instanceof VideoGallery;

        if (isInitialized) {
            return;
        }

        $el.data(pluginKey, new VideoGallery($el));
    });

}
