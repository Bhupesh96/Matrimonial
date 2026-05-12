<?php
// pages/edit_profile.php
// Admin-side full profile editor. Mirrors the website's user-profile-edit page
// but lets an admin edit ANY profile by ProfileID.
//
// Loads master data + the target profile from the same APIs the website uses
// (?api=get_master&master_type=...  and  ?api=get_profile&ProfileID=...) and
// submits changes through ?api=update_profile (which already accepts admin
// sessions per the role gate in plug/api/index.php).

$profileID = isset($_GET['ProfileID']) ? intval($_GET['ProfileID']) : 0;
if ($profileID <= 0) {
    echo '<div class="alert alert-danger m-4">No ProfileID provided.</div>';
    return;
}
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

<style>
    .ep-wrap          { max-width: 1100px; margin: 24px auto; }
    .ep-card          { background:#fff; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,.06); padding:24px 28px; margin-bottom:24px; }
    .ep-card h4       { color:#0d6efd; font-weight:600; padding-bottom:8px; margin-bottom:16px; border-bottom:2px solid #eef3ff; }
    .ep-toolbar       { display:flex; flex-wrap:wrap; gap:8px; justify-content:space-between; align-items:center; background:#fff; padding:12px 20px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,.04); margin-bottom:16px; }
    .ep-photo-box     { text-align:center; }
    .ep-photo-box img { width:170px; height:170px; object-fit:cover; border-radius:50%; border:3px solid #fff; box-shadow:0 4px 14px rgba(0,0,0,.1); background:#e9ecef; }
    .ep-photo-label   { display:inline-block; margin-top:10px; padding:8px 16px; border-radius:30px; background:#0d6efd; color:#fff; cursor:pointer; font-size:.85rem; }
    .ep-photo-label:hover { background:#0b5ed7; }
    .form-label       { font-weight:500; color:#444; margin-bottom:.25rem; font-size:.9rem; }
    .form-label .req  { color:#dc3545; margin-left:2px; }
    .ep-stuck-banner  { position:sticky; bottom:0; background:#fff; padding:14px 20px; border-top:1px solid #eee; box-shadow:0 -2px 8px rgba(0,0,0,.05); display:flex; gap:10px; justify-content:flex-end; z-index:5; }
    .select2-container--bootstrap-5 .select2-selection { min-height:38px; }
    /* Hide the form until masters + profile have loaded so users don't see empty selects briefly */
    .ep-loading-cover { text-align:center; padding:60px 0; color:#666; }
</style>

<div class="ep-wrap">
    <!-- Toolbar -->
    <div class="ep-toolbar">
        <div>
            <a href="?candidatelist" class="btn btn-outline-secondary btn-sm">
                <i class="bi bi-arrow-left me-1"></i>Back to Candidates
            </a>
            <a href="?viewprofile&ProfileID=<?php echo $profileID; ?>" class="btn btn-outline-primary btn-sm ms-1">
                <i class="bi bi-eye me-1"></i>View Profile
            </a>
        </div>
        <div>
            <span class="text-muted small me-2">Editing ProfileID:</span>
            <span class="badge bg-primary fs-6"><?php echo $profileID; ?></span>
        </div>
    </div>

    <!-- Loading state -->
    <div id="ep-loading" class="ep-card ep-loading-cover">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-3 mb-0">Loading profile and master data&hellip;</p>
    </div>

    <!-- Edit Form (hidden until ready) -->
    <form id="ep-form" enctype="multipart/form-data" style="display:none;">
        <input type="hidden" name="ProfileID" value="<?php echo $profileID; ?>">
        <input type="hidden" name="UserID"    id="ep-UserID" value="">

        <!-- 1. PROFILE PHOTO + IDENTITY -->
        <div class="ep-card">
            <h4>Identity & Photo</h4>
            <div class="row g-3">
                <div class="col-md-3">
                    <div class="ep-photo-box">
                        <img id="ep-photo-preview" src="https://via.placeholder.com/170?text=No+Photo" alt="profile">
                        <label for="ep-photo-input" class="ep-photo-label">
                            <i class="bi bi-camera me-1"></i>Change Photo
                        </label>
                        <input type="file" id="ep-photo-input" name="ProfilePhoto" accept="image/*" style="display:none;">
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="row g-3">
                        <div class="col-md-3">
                            <label class="form-label">Title</label>
                            <select name="Title" class="form-select" id="ep-Title">
                                <option value="">--</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Ms.">Ms.</option>
                                <option value="Dr.">Dr.</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">First Name<span class="req">*</span></label>
                            <input class="form-control" name="firstname" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Middle Name</label>
                            <input class="form-control" name="MiddleName">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Last Name<span class="req">*</span></label>
                            <input class="form-control" name="lastname" required>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Gender<span class="req">*</span></label>
                            <select name="GenderID" class="form-select ep-search" data-master="genders" required></select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Date of Birth</label>
                            <input type="date" class="form-control" name="DateOfBirth">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Birth Place</label>
                            <input class="form-control" name="BirthPlace">
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Birth Time</label>
                            <input type="time" class="form-control" name="BirthTime">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Birth Name</label>
                            <input class="form-control" name="BirthName">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Mother Tongue</label>
                            <select name="MotherTongueID" class="form-select ep-search" data-master="mothertongues"></select>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Religion</label>
                            <select name="ReligionID" class="form-select ep-search" data-master="religions"></select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Marital Status</label>
                            <select name="MaritalStatusID" class="form-select ep-search" data-master="maritalstatuses"></select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Manglik</label>
                            <select name="Manglik" class="form-select">
                                <option value="">--</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Don't Know">Don't Know</option>
                            </select>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Gotra</label>
                            <select name="GotraID" class="form-select ep-search" data-master="gotras"></select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Nana Gotra</label>
                            <select name="NanaGotraId" class="form-select ep-search" data-master="gotras"></select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Rashi</label>
                            <select name="Rashi" class="form-select ep-search" data-master="rashis" data-key="name"></select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2. PHYSICAL -->
        <div class="ep-card">
            <h4>Physical Details</h4>
            <div class="row g-3">
                <div class="col-md-3">
                    <label class="form-label">Height</label>
                    <select name="HeightID" class="form-select ep-search" data-master="heights"></select>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Weight (kg)</label>
                    <input type="number" min="0" step="0.1" class="form-control" name="Weight">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Complexion</label>
                    <input class="form-control" name="Complexion">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Blood Group</label>
                    <select name="BloodGroupID" class="form-select ep-search" data-master="bloodgroups"></select>
                </div>
            </div>
        </div>

        <!-- 3. FAMILY -->
        <div class="ep-card">
            <h4>Family Details</h4>
            <div class="row g-3">
                <div class="col-md-4">
                    <label class="form-label">Father's Name</label>
                    <input class="form-control" name="FatherName">
                </div>
                <div class="col-md-4">
                    <label class="form-label">Father's Status</label>
                    <input class="form-control" name="FatherStatus">
                </div>
                <div class="col-md-4">
                    <label class="form-label">Father's Occupation</label>
                    <select name="FatherOccupationID" class="form-select ep-search" data-master="occupations"></select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Mother's Name</label>
                    <input class="form-control" name="MotherName">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Mother's Occupation</label>
                    <input class="form-control" name="MotherOccupation">
                </div>

                <div class="col-md-3">
                    <label class="form-label">No. of Brothers</label>
                    <input type="number" min="0" class="form-control" name="NoOfBrothers">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Brothers Married</label>
                    <input type="number" min="0" class="form-control" name="NoOfBrothersMarried">
                </div>
                <div class="col-md-3">
                    <label class="form-label">No. of Sisters</label>
                    <input type="number" min="0" class="form-control" name="NoOfSisters">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Sisters Married</label>
                    <input type="number" min="0" class="form-control" name="NoOfSistersMarried">
                </div>

                <!-- Paitthi Nivas: same cities master as Current City, but value = city NAME (matches get_profile / React app). -->
                <div class="col-md-12">
                    <label class="form-label">Paitthi Nivas / Khor</label>
                    <select name="PaitthiNivasKhor" class="form-select ep-search" data-master="cities" data-key="name"></select>
                    <small class="text-muted">Searchable city list (saved as city name in database).</small>
                </div>
            </div>
        </div>

        <!-- 4. EDUCATION & CAREER -->
        <div class="ep-card">
            <h4>Education & Career</h4>
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Education Degrees</label>
                    <select name="EducationDegreeID" class="form-select ep-search" data-master="educationdegrees" multiple></select>
                    <small class="text-muted">Choose one or more</small>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Education Detail</label>
                    <input class="form-control" name="EducationDetail">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Occupation</label>
                    <select name="OccupationID" class="form-select ep-search" data-master="occupations"></select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Working As</label>
                    <input class="form-control" name="WorkingAs">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Organization Name</label>
                    <input class="form-control" name="OrganizationName">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Organization Location</label>
                    <input class="form-control" name="OrganizationLocation">
                </div>

                <div class="col-md-12">
                    <label class="form-label">Annual Income</label>
                    <select name="AnnualIncomeID" class="form-select ep-search" data-master="incomeranges"></select>
                </div>
            </div>
        </div>

        <!-- 5. LOCATION & LIFESTYLE -->
        <div class="ep-card">
            <h4>Location & Lifestyle</h4>
            <div class="row g-3">
                <div class="col-md-4">
                    <label class="form-label">Current City</label>
                    <select name="LocationCityID" class="form-select ep-search" data-master="cities"></select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Diet</label>
                    <select name="DietID" class="form-select ep-search" data-master="diets"></select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Preferred Marriage Area</label>
                    <select name="PreferredAreaOfMarriage" class="form-select ep-search" data-master="preference_marriage_area" data-key="name"></select>
                </div>
                <div class="col-md-12">
                    <label class="form-label">Hobbies</label>
                    <input class="form-control" name="Hobbies" placeholder="Reading, Travel, Cricket...">
                </div>
                <div class="col-md-12">
                    <label class="form-label">Partner Expectations</label>
                    <textarea class="form-control" name="PartnerExpectations" rows="3"></textarea>
                </div>
            </div>
        </div>

        <!-- 6. CONTACT -->
        <div class="ep-card">
            <h4>Contact Details</h4>
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Contact Person Name</label>
                    <input class="form-control" name="ContactPersonName">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Relationship to Person</label>
                    <select name="ContactPersonRelationshipID" class="form-select ep-search" data-master="relationships"></select>
                </div>

                <div class="col-md-4">
                    <label class="form-label">Mobile (Primary)</label>
                    <input class="form-control" name="ContactMobile">
                </div>
                <div class="col-md-4">
                    <label class="form-label">Mobile 2</label>
                    <input class="form-control" name="ContactMobile2">
                </div>
                <div class="col-md-4">
                    <label class="form-label">Landline / Phone</label>
                    <input class="form-control" name="ContactPhone">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" name="ContactEmail">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Contact City</label>
                    <select name="ContactCityID" class="form-select ep-search" data-master="cities"></select>
                </div>

                <div class="col-md-12">
                    <label class="form-label">Address</label>
                    <textarea class="form-control" name="Address" rows="2"></textarea>
                </div>
            </div>
        </div>

        <!-- Sticky Save bar -->
        <div class="ep-stuck-banner">
            <button type="button" class="btn btn-outline-secondary" onclick="window.location.href='?candidatelist'">Cancel</button>
            <button type="submit" class="btn btn-primary" id="ep-save-btn">
                <i class="bi bi-check-circle me-1"></i>Save Changes
            </button>
        </div>
    </form>
</div>

<!-- jQuery + Select2 + SweetAlert2 -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
    // The admin theme loads its own jQuery later in the page (footer.php's
    // js/jquery.min.js), which would otherwise OVERWRITE window.$ and break
    // any Select2 calls we make after the first `await`. Snapshot OUR jQuery
    // (with Select2 attached) into `$j` synchronously, before any await yields
    // control back to the parser, and use `$j` everywhere instead of `$`.
    const $j = (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2)
        ? jQuery.noConflict(true)
        : window.jQuery;

    const PROFILE_ID = <?php echo $profileID; ?>;
    const API = 'plug/api/';

    // Helper: GET wrapped with credentials so the admin session cookie is sent.
    async function api(path) {
        const r = await fetch(API + path, { credentials: 'include' });
        const text = await r.text();
        try { return { ok: r.ok, status: r.status, body: text ? JSON.parse(text) : {} }; }
        catch { return { ok: false, status: r.status, body: { message: 'Non-JSON response: ' + text.substring(0, 200) } }; }
    }

    // Map every dropdown that needs master data to its master_type.
    function uniqueMasterTypes() {
        const set = new Set();
        document.querySelectorAll('select[data-master]').forEach(el => set.add(el.dataset.master));
        return [...set];
    }

    // Populate all selects with the master rows. Stores both the {id:..,name:..}
    // map and primes Select2 with placeholders.
    function populateSelect(el, rows) {
        const useNameAsValue = (el.dataset.key === 'name');
        // Preserve the first <option> if present (e.g. the "--" empty option on Title).
        // For ep-search selects we usually start empty; add a "" option for non-multi.
        if (!el.multiple) {
            el.innerHTML = '<option value=""></option>';
        } else {
            el.innerHTML = '';
        }
        rows.forEach(r => {
            const opt = document.createElement('option');
            opt.value = useNameAsValue ? String(r.name) : String(r.id);
            opt.textContent = r.name;
            el.appendChild(opt);
        });
    }

    // Apply Select2 to every searchable select.
    function applySelect2() {
        $j('.ep-search').each(function () {
            const $el = $j(this);
            const isMulti = this.multiple;
            $el.select2({
                theme: 'bootstrap-5',
                width: '100%',
                placeholder: isMulti ? 'Choose one or more' : 'Search…',
                allowClear: !isMulti && !$el.prop('required'),
                multiple: isMulti
            });
        });
    }

    // Apply a profile object onto the form (sets every named input/select).
    function fillForm(p) {
        document.getElementById('ep-UserID').value = p.UserID || '';

        // Profile photo preview
        const img = document.getElementById('ep-photo-preview');
        const photoUrl = p.ProfileImageURL || p.ProfilePhoto;
        if (photoUrl) img.src = photoUrl;

        // Trim DateOfBirth to YYYY-MM-DD if it includes time
        if (p.DateOfBirth) p.DateOfBirth = String(p.DateOfBirth).split(' ')[0];

        const form = document.getElementById('ep-form');
        // Touch each named input/select; set value if profile has it.
        form.querySelectorAll('input[name],select[name],textarea[name]').forEach(el => {
            const key = el.getAttribute('name');
            if (key === 'ProfilePhoto' || key === 'ProfileID') return;
            if (!(key in p)) return;
            let v = p[key];
            if (v === null || v === undefined) return;

            // PaitthiNivasKhor: API may use alternate spellings — match city option case-insensitively when using data-key="name".
            if (key === 'PaitthiNivasKhor' && el.tagName === 'SELECT' && el.dataset.key === 'name' && typeof v === 'string') {
                const want = v.trim().toLowerCase();
                let matched = '';
                for (let i = 0; i < el.options.length; i++) {
                    if (String(el.options[i].value).trim().toLowerCase() === want) {
                        matched = el.options[i].value;
                        break;
                    }
                }
                v = matched || v;
            }

            if (el.tagName === 'SELECT' && el.multiple) {
                // Multi-select: API may return CSV string ("68,86") or array
                let arr = v;
                if (typeof v === 'string') arr = v.split(',').map(s => s.trim()).filter(Boolean);
                $j(el).val(arr).trigger('change');
            } else if (el.tagName === 'SELECT') {
                $j(el).val(String(v)).trigger('change');
            } else {
                el.value = v;
            }
        });
    }

    // ----- Bootstrap the page -----
    (async function bootstrapPage() {
        try {
            // 1. Load every master in parallel
            const masterTypes = uniqueMasterTypes();
            const masterResults = await Promise.all(
                masterTypes.map(t => api('?api=get_master&master_type=' + encodeURIComponent(t)))
            );
            const masters = {};
            masterTypes.forEach((t, i) => { masters[t] = (masterResults[i].body.data || []); });

            // 2. Populate every <select data-master>
            document.querySelectorAll('select[data-master]').forEach(el => {
                populateSelect(el, masters[el.dataset.master] || []);
            });

            // 3. Activate Select2 (must happen AFTER options populated)
            applySelect2();

            // 4. Load the profile (pass ViewerID = ProfileID so server sees us as owner = full data)
            const pRes = await api('?api=get_profile&ProfileID=' + PROFILE_ID + '&ViewerID=' + PROFILE_ID);
            if (!pRes.ok || pRes.body.status !== 200 || !(pRes.body.data && pRes.body.data.length)) {
                throw new Error(pRes.body.message || ('HTTP ' + pRes.status));
            }
            fillForm(pRes.body.data[0]);

            // 5. Show form, hide loader
            document.getElementById('ep-loading').style.display = 'none';
            document.getElementById('ep-form').style.display = 'block';
        } catch (err) {
            document.getElementById('ep-loading').innerHTML =
                '<div class="alert alert-danger m-0"><strong>Could not load profile:</strong><br>' +
                (err.message || err) + '</div>';
        }
    })();

    // ----- Photo preview -----
    document.getElementById('ep-photo-input').addEventListener('change', e => {
        const f = e.target.files[0];
        if (f) document.getElementById('ep-photo-preview').src = URL.createObjectURL(f);
    });

    // ----- Submit -----
    document.getElementById('ep-form').addEventListener('submit', async e => {
        e.preventDefault();
        const btn = document.getElementById('ep-save-btn');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving…';

        try {
            const fd = new FormData(e.target);

            // Multi-selects need to be flattened to CSV (API expects "68,86" not multiple values)
            const multiSelects = e.target.querySelectorAll('select[multiple]');
            multiSelects.forEach(sel => {
                const name = sel.getAttribute('name');
                fd.delete(name);
                const vals = $j(sel).val() || [];
                fd.append(name, vals.join(','));
            });

            // Drop the file field if empty (otherwise PHP $_FILES still gets an entry with error=4)
            const photo = document.getElementById('ep-photo-input');
            if (!photo.files || !photo.files[0]) fd.delete('ProfilePhoto');

            const res = await fetch(API + '?api=update_profile', {
                method: 'POST',
                credentials: 'include',
                body: fd
            });
            const raw = await res.text();
            let body;
            try { body = raw ? JSON.parse(raw) : {}; }
            catch { throw new Error('Non-JSON response: ' + raw.substring(0, 200)); }

            if (res.ok && body.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile updated',
                    text: body.message || 'Saved successfully.',
                    timer: 1800,
                    showConfirmButton: false
                });
            } else {
                Swal.fire('Update failed', body.message || ('HTTP ' + res.status), 'error');
            }
        } catch (err) {
            Swal.fire('Error', err.message || String(err), 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="bi bi-check-circle me-1"></i>Save Changes';
        }
    });
</script>
