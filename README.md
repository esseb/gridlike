# gridlike

If you want two separate grid helpers for desktop and mobile:

```
new Gridlike({
    columnCount: 12,
    columnWidth: 22,
    gutterWidth: 5,
    classNames: {
        grid: 'grid grid--mobile',
        column: 'grid__column'
    }
});

new Gridlike({
    columnCount: 12,
    columnWidth: 60,
    gutterWidth: 22,
    classNames: {
        grid: 'grid grid--desktop',
        column: 'grid__column'
    }
});
```

And accompanying stylesheet:
```
.grid--mobile {
    display: none;
}

.grid--desktop {
    display: none;
}

@media only screen and (max-width: 400px) {
    display: block;
}

@media only screen and (min-width: 401px) {
    .grid--desktop {
        display: block;
    }
}
```

# TODO
* Make grid flexible (enabled by default)
* Offload all styling to the user if `columnWidth` and `gutterWidth` is undefined?